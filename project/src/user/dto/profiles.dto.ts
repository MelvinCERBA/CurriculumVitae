import { IsArray, IsOptional, IsString } from "class-validator";

export class ProfilesDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[]
}