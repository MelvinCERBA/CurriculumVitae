import { ObjectType, Field, ID } from "@nestjs/graphql/dist";
import { ExperienceModel } from "../../experience/graphql/experience.model";
import { User } from "../entities/user.entity";


@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  pictureUrl?: string;

  @Field()
  description: string;

  @Field()
  email: string;

  @Field(() => [ExperienceModel], { nullable: true })
  experiences?: ExperienceModel[];

  @Field(() => [String], { nullable: true })
  tags?: string[];

  static fromEntity(ent: User) {
    return {
      id: ent.id,
      firstName: ent.firstName,
      lastName: ent.lastName,
      pictureUrl: ent.pictureUrl,
      description: ent.description,
      email: ent.email,
    }
  }
}
