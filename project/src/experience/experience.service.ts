import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from './entities/experience.entity';
import { In, Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { UserService } from '../user/user.service';
import { GetExperiencesDto } from './dto/get-experiences.dto';
import { PaginatedResponse } from '../common/pagination/paginated-response.abstract';
import { ICreateExperienceData } from './interfaces/create-experience.interface';
import { IUpdateExperienceData } from './interfaces/update-experience.interface';
import { BaseGetExperiencesData } from './interfaces/get-experiences.interface';
import { Tag } from '../tag/entities/tag.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ExperienceService {

  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
    private readonly tagService: TagService,
    private readonly userService: UserService
  ) { }

  async create(data: ICreateExperienceData) {
    const tagsEnts = await Promise.all(data.tags.map(async (createTagdata) => {
      return this.tagService.getOrCreate(createTagdata);
    }));

    const user = await this.userService.findOneById(data.userId)
    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    const experience = this.experienceRepository.create({
      ...data,
      tags: tagsEnts,
      user: user
    });

    return this.experienceRepository.save(experience);
  }


  async findByUser(userId: number) {
    return this.experienceRepository.find({ where: { user: { id: userId } } });
  }

  async update(id: number, updateExperienceData: IUpdateExperienceData) {
    const experience = await this.experienceRepository.findOne({
      where: { id: id },
      relations: ['tags', 'user'],
    });

    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }

    let tags = experience.tags;
    if (updateExperienceData.tagNames) {
      tags = await Promise.all(updateExperienceData.tagNames.map(async ({ name, categoryName }) => {
        return this.tagService.getOrCreate({ name, categoryName });
      }));
    }

    const newExperience: Experience = {
      ...experience,
      ...(updateExperienceData.pictureUrl !== undefined && { pictureUrl: updateExperienceData.pictureUrl }),
      ...(updateExperienceData.title !== undefined && { title: updateExperienceData.title }),
      ...(updateExperienceData.description !== undefined && { description: updateExperienceData.description }),
      ...(updateExperienceData.link !== undefined && { link: updateExperienceData.link }),
      tags: tags
    };

    return this.experienceRepository.save(newExperience);
  }

  async remove(id: number) {
    return this.experienceRepository.delete({ id });
  }

  async search(data: BaseGetExperiencesData): Promise<PaginatedResponse<Experience>> {
    const query = this.experienceRepository.createQueryBuilder('experience')
      .leftJoinAndSelect('experience.tags', 'tag')
      .leftJoinAndSelect('experience.user', 'user')
      .take(data.limit)
      .skip((data.page - 1) * data.limit);

    if (data.userId) {
      query.andWhere('experience.user.id = :userId', { userId: data.userId });
    }

    if (data.tagNames && data.tagNames.length > 0) {
      query.andWhere('tag.name IN (:...tagNames)', { tagNames: data.tagNames });
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
    return {
      data: experiences,
      total: count,
      previousPage: data.page > 1 ? data.page - 1 : null,
      nextPage: (data.page - 1) * data.limit + data.limit < count ? data.page + 1 : null,
      lastPage: Math.floor(count / data.limit) + 1
    };
  }

  async getExperienceTags(experienceId: number): Promise<Tag[]> {
    const tags = await this.experienceRepository
      .createQueryBuilder('experience')
      .relation(Experience, 'tags')
      .of(experienceId)
      .loadMany<Tag>();

    const uniqueTags = Object.values(tags.reduce((acc, tag) => {
      acc[tag.id] = tag;
      return acc;
    }, {})) as Tag[]

    return uniqueTags;
  }

  async getExperienceUser(experienceId: number): Promise<User> {
    const user = await this.experienceRepository
      .createQueryBuilder('experience')
      .relation(Experience, 'user')
      .of(experienceId)
      .loadOne<User>();

    return user;
  }
}

