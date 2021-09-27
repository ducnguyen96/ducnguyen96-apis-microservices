import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/services/user.service';
import { AuthService } from './auth.service';
import { RegisterPayload } from './dto/RegisterPayload';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserLoginInput } from './dto/UserLogin.input';
import { UserRegisterInput } from './dto/UserRegister.input';

@Resolver()
export class AuthResolver {
  constructor(
    public readonly userService: UserService,
    public readonly authService: AuthService,
  ) {}

  @Mutation(() => RegisterPayload)
  async register(
    @Args('input') input: UserRegisterInput,
  ): Promise<RegisterPayload> {
    return this.authService.register(input);
  }

  @Mutation(() => TokenPayloadDto)
  async login(@Args('input') input: UserLoginInput): Promise<TokenPayloadDto> {
    const user = await this.authService.validateUser(input);
    const token = await this.authService.createToken(user.id);
    return {
      ...token,
    };
  }
}
