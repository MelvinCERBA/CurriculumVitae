import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { In, Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { GetExperiencesDto } from './dto/get-experiences.dto';
import { PaginatedResponseDto } from '../common/dto/paginated-response.dto';

@Injectable()
export class ExperienceService {

  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    private readonly tagService: TagService,
    private readonly userService: UserService
  ) { }

  async create(dto: CreateExperienceDto) {
    const tagsEnts = await Promise.all(dto.tags.map(async (createTagDto) => {
      return this.tagService.getOrCreate(createTagDto);
    }));

    const user = await this.userService.findOneById(dto.userId)
    if (!user) {
      throw new NotFoundException(`User with ID ${dto.userId} not found`);
    }

    const experience = this.experienceRepository.create({
      ...dto,
      tags: tagsEnts,
      user: user
    });

    return this.experienceRepository.save(experience);
  }


  async findByUser(userId: number) {
    return this.experienceRepository.find({ where: { user: { id: userId } } });
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    const experience = await this.experienceRepository.findOne({
      where: { id: id },
      relations: ['tags', 'user'],
    });

    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    let tags = experience.tags;
    if (updateExperienceDto.tagNames) {
      tags = await Promise.all(updateExperienceDto.tagNames.map(async ({ name, categoryName }) => {
        return this.tagService.getOrCreate({ name, categoryName });
      }));
    }

    const newExperience: Experience = {
      ...experience,
      ...(updateExperienceDto.pictureUrl !== undefined && { pictureUrl: updateExperienceDto.pictureUrl }),
      ...(updateExperienceDto.title !== undefined && { title: updateExperienceDto.title }),
      ...(updateExperienceDto.description !== undefined && { description: updateExperienceDto.description }),
      ...(updateExperienceDto.link !== undefined && { link: updateExperienceDto.link }),
      tags: tags
    };

    return this.experienceRepository.save(newExperience);
  }

  async remove(id: number) {
    return this.experienceRepository.delete({ id });
  }

  async search(dto: GetExperiencesDto): Promise<[Experience[], number]> {
    const query = this.experienceRepository.createQueryBuilder('experience')
      .leftJoinAndSelect('experience.tags', 'tag')
      .leftJoinAndSelect('experience.user', 'user')
      .take(dto.limit)
      .skip((dto.page - 1) * dto.limit);

    if (dto.userId) {
      query.andWhere('experience.user.id = :userId', { userId: dto.userId });
    }

    if (dto.tagNames && dto.tagNames.length > 0) {
      query.andWhere('tag.name IN (:...tagNames)', { tagNames: dto.tagNames });
    }

    const [experiences, count] = await query.getManyAndCount();

    // Ensure all tags are fully loaded for these experiences
    for (const experience of experiences) {
      experience.tags = await this.experienceRepository
        .createQueryBuilder('experience')
        .relation(Experience, 'tags')
        .of(experience.id)
        .loadMany();
    }

    return [experiences, count];
  }
}

