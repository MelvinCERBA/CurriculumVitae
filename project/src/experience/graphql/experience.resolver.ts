import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql/dist";
import { ExperienceModel } from "./experience.model";
import { ExperienceService } from "../experience.service";
import { PaginatedResponse } from "../../common/pagination/paginated-response.abstract";
import { BaseGetExperiencesData } from "../interfaces/get-experiences.interface";
import { GetExperiencesInput } from "./get-experiences.input";
import { Public } from "../../authentication/public.guard";
import { UserModel } from "../../user/graphql/user.model";
import { CreateExperienceInput } from "./create-experience.input";

@Resolver(() => ExperienceModel)
export class ExperienceResolver {
  constructor(
    private readonly experienceService: ExperienceService,
    private readonly tagService: ExperienceService
  ) { }

  // #region Queries
  @Query(() => [ExperienceModel])
  @Public()
  async experiences(@Args('input') input: GetExperiencesInput): Promise<ExperienceModel[]> {
    const experiences = await this.experienceService.search(input);
    const experienceModels = experiences.data.map(
      experience => ExperienceModel.fromEntity(experience)
    );
    return experienceModels;
  }
  // #endregion

  // #region Field Resolvers
  @ResolveField(() => [String])
  async tags(@Parent() exp: ExperienceModel): Promise<String[]> {
    const tagEntities = await this.experienceService.getExperienceTags(exp.id);
    const tagModels = tagEntities.map(
      tag => tag.name
    );

    return tagModels
  }


  @ResolveField(() => [UserModel])
  async user(@Parent() exp: ExperienceModel): Promise<UserModel> {
    const userEntity = await this.experienceService.getExperienceUser(exp.id);
    const userModel = UserModel.fromEntity(userEntity);
    return userModel
  }
  // #endregion

  // #region Mutations
  @Mutation(() => ExperienceModel)
  async createExperience(@Args('input') input: CreateExperienceInput): Promise<ExperienceModel> {
    const experience = await this.experienceService.create(input);
    const experienceModel = ExperienceModel.fromEntity(experience);

    return experienceModel
  }
  // #endregion


}
