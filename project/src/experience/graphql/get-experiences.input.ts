import { Field, InputType, Int } from "@nestjs/graphql";
import { BaseGetExperiencesData } from "../interfaces/get-experiences.interface";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

@InputType()
export class GetExperiencesInput extends BaseGetExperiencesData {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  userId?: number;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagNames?: string[];
}