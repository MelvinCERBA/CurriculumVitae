import { Field, Int, ObjectType } from "@nestjs/graphql/dist";

@ObjectType()
export class JwtModel {
  @Field(() => Int)
  userId: number;

  @Field(() => String)
  token: string
}