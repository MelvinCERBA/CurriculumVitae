import { InputType, Field } from "@nestjs/graphql/dist";
import { IsEmail, IsString } from "class-validator";
import { BaseLogInData } from "../interfaces/login.interface";

@InputType()
export class LoginInput extends BaseLogInData {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}