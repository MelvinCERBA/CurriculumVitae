import { Field, Int, ObjectType } from "@nestjs/graphql/dist";
import { UserModel } from "../../user/graphql/user.model";
import { Experience } from "../entities/experience.entity";

@ObjectType()
export class ExperienceModel {
  @Field(() => Int!)
  id: number
  @Field(() => String, { nullable: true })
  pictureUrl?: string
  @Field(() => String)
  title: string
  @Field(() => String)
  description: string
  @Field(() => String)
  link: string
  @Field(() => [String], { nullable: true })
  tags: string[]
  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  static fromEntity(ent: Experience) {
    return {
      id: ent.id,
      pictureUrl: ent.pictureUrl,
      title: ent.title,
      description: ent.description,
      link: ent.link,
      tags: ent.tags?.map(tag => tag.name),
    }
  }
}