import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Experience } from '../entities/experience.entity';
import { UserResponseDto } from '../../user/dto/user-response.dto';
import { TagResponseDto } from '../../tag/dto/tag-response.dto';
import { BaseGetExperiencesData } from '../interfaces/get-experiences.interface';

export class GetExperiencesDto extends BaseGetExperiencesData {
  @IsNumber()
  @IsOptional()
  userId: number

  @IsArray()
  @IsOptional()
  tagNames?: string[]
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
