import { GENDER } from '@ducnguyen96/ducnguyen96-apis-common-types';
import { Field, InputType, registerEnumType } from '@nestjs/graphql';

@InputType()
export class UpdateUserSettingInput {
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

  @Field(() => Number, { defaultValue: 300 })
  drinkAtATime: number;

  @Field(() => Number, { defaultValue: 300 })
  containerVolume: number;
}

registerEnumType(GENDER, {
  name: 'GENDER',
});
