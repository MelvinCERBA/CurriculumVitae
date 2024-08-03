import { ArrayNotEmpty, IsArray, IsOptional, IsString } from "class-validator"
import { TagCategory } from "../entities/tag-category.entity"

export class CreateTagCategoryDto {
  @IsString()
  name: string

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  aliases: string[]
}
