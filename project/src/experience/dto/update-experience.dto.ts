import { PartialType } from '@nestjs/mapped-types';
import { CreateExperienceDto } from './create-experience.dto';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { Tag } from '../../tag/entities/tag.entity';

export class UpdateExperienceDto extends PartialType(CreateExperienceDto) {
  @IsNumber()
  id: number

  @IsString()
  @IsOptional()
  picture_url: string

  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string

  @IsString()
  @IsOptional()
  link: string

  @IsArray()
  @IsOptional()
  tags: Tag[]
}
