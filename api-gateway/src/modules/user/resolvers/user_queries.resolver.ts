import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from '../../../decorators/auth-user.decorator';
import { AuthGuardRequired } from '../../../guards/auth.guard';
import { UserEntity } from '../entities/user.entity';
import { UserObject } from '../objects/user.object';

@Resolver(() => UserObject)
export class UserQueriesResolver {
  @UseGuards(AuthGuardRequired)
  @Query(() => UserObject)
  me(@AuthUser() user: UserEntity): UserEntity {
    return user;
  }
}
