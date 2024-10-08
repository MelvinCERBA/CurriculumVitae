import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUpdateUserData } from './interfaces/update-user-data.interface';
import { ICreateUserData } from './interfaces/create-user-data.interface';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) { }

  async create({ password, ...user }: ICreateUserData): Promise<User> {
    // stores the salt in the generated hash (eg. $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36UNaZCAp6kz47J/F.3A5gG )
    const passwordHash = await hash(password, 10);
    return this.userRepository.save({
      ...user,
      passwordHash: passwordHash,
    });
  }

  async findOneByEmail(email: string, options: FindOneOptions<User> = {}): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      ...options,
    });
  }

  async findUsersByTags(tags: string[]): Promise<User[]> {
    if (!tags.length) return this.userRepository.find(
      { relations: ['experiences', 'experiences.tags'] }
    );
    return this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.experiences', 'experience')
      .leftJoinAndSelect('experience.tags', 'tag')
      .where(qb => {
        const subQuery = qb.subQuery()
          .select('subUser.id')
          .from('user', 'subUser')
          .leftJoin('subUser.experiences', 'subExperience')
          .leftJoin('subExperience.tags', 'subTag')
          .where('subTag.name IN (:...tags)')
          .getQuery();
        return 'user.id IN ' + subQuery;
      })
      .setParameter('tags', tags)
      .getMany();
  }

  async getUserTags(id: number): Promise<Tag[]> {
    const tags = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoin('tag.experiences', 'experience')
      .leftJoin('experience.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('tag.id')
      .getMany();
    return tags
  }

  async findOneById(id: number, options: FindOneOptions<User> = {}): Promise<User> {
    console.log('id: ', id)
    return this.userRepository.findOne({
      where: { id },
      ...options,
    });
  }


  async update(id: number, data: IUpdateUserData): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.userRepository.save({ ...user, ...data });
  }

}
