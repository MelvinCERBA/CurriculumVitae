import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Tag } from "../entities/tag.entity";
import { TagService } from "../tag.service";
import { TagModel } from "./tag.model";

@Resolver(() => TagModel)
export class TagResolver {
  constructor(private readonly tagService: TagService) { }

  @Query(() => [TagModel])
  async tags(): Promise<TagModel[]> {
    const tags = await this.tagService.findAll();
    const tagModels = tags.map(
      tag => TagModel.fromEntity(tag)
    )
    return tagModels;
  }

  @Mutation(() => TagModel)
  async createTag(@Args('name') name: string): Promise<TagModel> {
    const tag = await this.tagService.create({ name });
    return TagModel.fromEntity(tag);
  }
}