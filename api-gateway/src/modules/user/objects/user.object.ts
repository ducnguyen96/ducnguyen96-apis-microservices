import { GENDER } from '@ducnguyen96/ducnguyen96-apis-common-types';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Node } from 'src/graphql/types/common.interface.entity';

@ObjectType()
export class UserObject implements Node {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => String, { nullable: false })
  avatar: string;

  @Field(() => Boolean)
  remindMe: boolean;

  @Field(() => Date)
  wakeUpTime: Date;

  @Field(() => Date)
  sleepTime: Date;

  @Field(() => GENDER)
  gender: GENDER;

  @Field(() => Number)
  weight: number;

  @Field(() => Number)
  dailyIntake: number;

  @Field(() => String)
  containerImage: string;

  @Field(() => Number)
  containerVolume: number;

  @Field(() => Number)
  drinkAtATime: number;

  @Field(() => String, { nullable: true })
  vapidKey?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

registerEnumType(GENDER, {
  name: 'GENDER',
});
