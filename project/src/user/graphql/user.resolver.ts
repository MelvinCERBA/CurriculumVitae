import { Resolver, Query, Mutation, Args, Context, ResolveField, Parent } from "@nestjs/graphql/dist";
import { UserModel } from "./user.model";
import { UserService } from "../user.service";
import { UserInput } from "./user.input";
import { UpdateUserDto } from "../dto/update-user.dto";
import { NotFoundException, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthenticationGuard } from "../../authentication/authentication.guard";
import { UpdateUserInput } from "./update-user.input";
import { Public } from "../../authentication/public.guard";
import { GetUsersInput } from "./get-users.input";
import { ExperienceModel } from "../../experience/graphql/experience.model";
import { ExperienceService } from "../../experience/experience.service";

@Resolver(() => UserModel)
export class UserResolver {

  constructor(
    private readonly userService: UserService,
    private readonly experienceService: ExperienceService,
  ) { }

  @Mutation(() => UserModel)
  async updateUser(@Context('req') { user }, @Args('input') input: UpdateUserInput): Promise<UserModel> {
    // check modifed user == current user 
    const { id, ...userInput } = input;
    if (id != user.sub) {
      throw new UnauthorizedException("Cannot modify other users.");
    }
    return UserModel.fromEntity(await this.userService.update(id, userInput));
  }

  @Mutation(() => UserModel)
  @Public()
  async createUser(@Args('input') input: UserInput): Promise<UserModel> {
    return UserModel.fromEntity(await this.userService.create(input));
  }

  @Query(() => UserModel)
  @Public()
  async user(@Args('id') id: number): Promise<UserModel> {
    const user = await this.userService.findOneById(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return UserModel.fromEntity(user)
  }

  @Query(() => [UserModel])
  @Public()
  async users(@Args('input') input: GetUsersInput): Promise<UserModel[]> {
    const users = (await this.userService.findUsersByTags(input.tags)).map(
      user => UserModel.fromEntity(user)
    );
    return users;
  }

  @ResolveField(() => [ExperienceModel])
  async experiences(@Parent() user: UserModel): Promise<ExperienceModel[]> {
    const experiences = await this.experienceService.findByUser(user.id)
    const experienceModels = experiences.map(
      experience => ExperienceModel.fromEntity(experience)
    )
    return experienceModels
  }

  @ResolveField(() => [String])
  async tags(@Parent() user: UserModel): Promise<string[]> {
    const tags = (await this.userService.getUserTags(user.id))
    const tagNames = tags.map(
      tag => tag.name
    )
    return !!tagNames.length ? tagNames : []
  }

}