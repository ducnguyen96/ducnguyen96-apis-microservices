import { Resolver } from '@nestjs/graphql';
import { UserObject } from '../objects/user.object';
import { UserService } from '../services/user.service';

@Resolver(() => UserObject)
export class UserMutationsResolver {
  constructor(private readonly userService: UserService) {}
}
