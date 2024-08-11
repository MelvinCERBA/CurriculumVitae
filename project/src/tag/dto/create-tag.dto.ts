import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { ICreateTagData } from "../interfaces/create-tag-data.interface";

export class CreateTagDto implements ICreateTagData {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  aliases?: string[];

  @IsOptional()
  @IsNumber()
  aliasFor?: number;

  @IsOptional()
  @IsString()
  categoryName?: string;
}
