import {
  Resolver,
  Mutation,
  Args,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/createAuthInput';
import { LoginInput } from './dto/loginInput';
import {
  LoginVendorResponse,
  RegisterVendorResponse,
} from './entities/register.entity';
import { Roles } from 'decorators/role.decorator';
import { userRole } from '@prisma/client';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => RegisterVendorResponse)
  async registerVendor(@Args('UserInput') UserInput: CreateAuthInput) {
    return this.authService.registerVendor(UserInput);
  }

  @Mutation(() => LoginVendorResponse)
  async loginVendor(
    @Args('UserInput') UserInput: LoginInput,
    @Context() context: GraphQLExecutionContext,
  ) {
    return this.authService.loginVendor(UserInput, context);
  }
  @Roles(userRole.ADMIN)
  @Mutation(() => LoginVendorResponse)
  async logoutVendor(@Context() context: GraphQLExecutionContext) {
    return this.authService.logoutVendor(context);
  }
  @Mutation(() => LoginVendorResponse)
  async forgotPassword(@Args('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Mutation(() => LoginVendorResponse)
  async resetPassword(
    @Args('password') password: string,
    @Context() context: GraphQLExecutionContext,
  ) {
    return this.authService.resetPassword(context, password);
  }
}
