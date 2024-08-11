import { Args, Query, Resolver } from "@nestjs/graphql/dist";
import { AuthenticationService } from "../authentication.service";
import { JwtModel } from "./jwt.model";
import { LoginInput } from "./login.input";
import { Public } from "../public.guard";

@Resolver()
export class AuthenticationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) { }

  @Query(() => JwtModel)
  @Public()
  login(@Args('input') input: LoginInput): Promise<JwtModel> {
    return this.authenticationService.logIn(input);
  }
}