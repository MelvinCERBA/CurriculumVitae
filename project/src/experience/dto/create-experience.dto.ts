import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { Tag } from "../../tag/entities/tag.entity"
import { CreateTagDto } from "../../tag/dto/create-tag.dto"
import { Type } from "class-transformer"
import { Experience } from "../entities/experience.entity"

export class CreateExperienceDto {
  @IsNumber()
  userId: number

  @IsString()
  @IsOptional()
  pictureUrl: string

  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  @IsOptional()
  link: string

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagDto)
  tags: CreateTagDto[]
}
