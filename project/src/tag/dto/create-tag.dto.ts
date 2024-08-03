import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTagDto {
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
