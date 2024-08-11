import { IsArray, IsOptional, IsString } from "class-validator";

export class GetUserDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[]
}