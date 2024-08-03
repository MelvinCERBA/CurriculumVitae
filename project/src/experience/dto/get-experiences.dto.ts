import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './create-experience.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Tag } from '../../tag/entities/tag.entity';
import { CreateTagDto } from '../../tag/dto/create-tag.dto';
import { PaginatedDto } from '../../common/dto/paginated.dto';
import { PaginatedResponseDto } from '../../common/dto/paginated-response.dto';
import { Experience } from '../entities/experience.entity';

export class GetExperiencesDto extends PaginatedDto {
  @IsString()
  @IsOptional()
  pictureUrl?: string

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsString()
  @IsOptional()
  link?: string

  @IsArray()
  @IsOptional()
  tagNames?: CreateTagDto[]
}

export type ExperiencesResponseDto = Experience;

export class GetExperiencesResponseDto extends PaginatedResponseDto<ExperiencesResponseDto> { }
