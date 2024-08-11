import { OmitType, PartialType } from "@nestjs/mapped-types";
import { UserInput } from "./user.input";
import { Field, InputType, Int } from "@nestjs/graphql/dist";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  @IsInt()
  id: number;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  pictureUrl?: string;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  password?: string;
} 