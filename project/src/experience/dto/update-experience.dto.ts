import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './create-experience.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Tag } from '../../tag/entities/tag.entity';
import { CreateTagDto } from '../../tag/dto/create-tag.dto';
import { IUpdateExperienceData } from '../interfaces/update-experience.interface';

export class UpdateExperienceDto implements IUpdateExperienceData {
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
