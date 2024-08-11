import { Field, InputType, Int } from "@nestjs/graphql";
import { ICreateTagData } from "../interfaces/create-tag-data.interface";
import { IsArray, IsInt, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateTagInput implements ICreateTagData {

  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  aliases?: string[];

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  aliasFor?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  categoryName?: string;
}