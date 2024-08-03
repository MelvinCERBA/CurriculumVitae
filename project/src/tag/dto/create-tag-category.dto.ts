import { ArrayNotEmpty, IsArray, IsOptional, IsString, ValidateNested } from "class-validator"
import { TagCategory } from "../entities/tag-category.entity"
import { Type } from "class-transformer"

export class CreateTagCategoryDto {
  @IsString()
  name: string

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[]
}


