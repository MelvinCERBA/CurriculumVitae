import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { TagModel } from "../../tag/graphql/tag.model";
import { AutocompletionService } from "../autocompletion.service";

@Resolver(() => TagModel)
export class AutocompletionResolver {

  constructor(private readonly tagService: AutocompletionService) { }

  @Query(() => [TagModel])
  async autocompletion(@Args('query') query: string, @Args('limit', { type: () => Int, nullable: true }) limit: number): Promise<TagModel[]> {
    const tags = await this.tagService.autocompletion(query, limit);
    return tags.map(tag => TagModel.fromEntity(tag));
  }
}