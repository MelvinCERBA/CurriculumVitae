import { ArrayNotEmpty, IsArray, IsOptional, IsString, ValidateNested } from "class-validator"
import { ICreateTagCategoryData } from "../interfaces/create-tag-category.dto"

export class CreateTagCategoryDto implements ICreateTagCategoryData {
  @IsString()
  name: string

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[]
}


