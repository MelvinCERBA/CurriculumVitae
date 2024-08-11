import { Field, InputType, Int } from "@nestjs/graphql";
import { ICreateExperienceData } from "../interfaces/create-experience.interface";
import { CreateTagInput } from "../../tag/graphql/create-tag.input";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@InputType()
export class CreateExperienceInput implements ICreateExperienceData {
  @Field(() => Int)
  @IsInt()
  userId: number

  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  pictureUrl?: string

  @Field(() => String)
  @IsString()
  description: string

  @Field(() => String)
  @IsString()
  link: string

  @Field(() => [CreateTagInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagInput)
  tags: CreateTagInput[]
}