import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './create-experience.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Tag } from '../../tag/entities/tag.entity';
import { CreateTagDto } from '../../tag/dto/create-tag.dto';
import { PaginatedDto } from '../../common/dto/paginated.dto';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';
import { Experience } from '../entities/experience.entity';
import { UserResponseDto } from '../../user/dto/user-response.dto';
import { TagResponseDto } from '../../tag/dto/tag-response.dto';

export class GetExperiencesDto extends PaginatedDto {
  @IsNumber()
  @IsOptional()
  userId: number

  @IsArray()
  @IsOptional()
  tagNames?: CreateTagDto[]
}

export class ExperienceResponseDto {
  id: number
  pictureUrl: string
  title: string
  description: string
  link: string
  tags: TagResponseDto[]
  user?: UserResponseDto

  static fromEntity(entity: Experience): ExperienceResponseDto {
    return {
      ...entity,
      tags: entity.tags?.map(tag => TagResponseDto.fromEntity(tag)),
      user: entity.user ? UserResponseDto.fromEntity(entity.user) : undefined,
    }
  }
};
