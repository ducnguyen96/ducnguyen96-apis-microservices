import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../../user/entities/user.entity';

import { TokenPayloadDto } from './TokenPayloadDto';

@ObjectType()
export class RegisterPayload {
  @Field()
  user: UserEntity;

  @Field()
  token: TokenPayloadDto;
}
