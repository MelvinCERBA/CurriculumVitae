import { Field, InputType } from "@nestjs/graphql/dist";
import { IsArray, IsString } from "class-validator";

@InputType()
export class GetUsersInput {
  @Field(() => [String])
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}