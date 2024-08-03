import { IsArray, IsOptional, IsString } from "class-validator"
import { Tag } from "../../tag/entities/tag.entity"

export class CreateExperienceDto {
  @IsString()
  @IsOptional()
  picture_url: string

  @IsString()
  title: string

  @IsString()
  description: string

  @IsString()
  @IsOptional()
  link: string

  @IsArray()
  @IsOptional()
  tags: Tag[]
}
