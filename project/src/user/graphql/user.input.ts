import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

@InputType()
export class UserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field({ nullable: true })
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  pictureUrl?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
