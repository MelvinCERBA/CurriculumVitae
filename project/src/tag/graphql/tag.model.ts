import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Tag } from "../entities/tag.entity";
import { OmitType, PickType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

@ObjectType()
export class TagModel extends PickType(Tag, ['id', 'name', 'priority'] as const) {
  @Field(() => Int!)
  id: number

  @Field(() => String!)
  name: string

  @Field(() => Int!)
  priority: number

  static fromEntity(entity: Tag) {
    const { id, name, priority } = entity;
    return { id, name, priority }
  }
}
