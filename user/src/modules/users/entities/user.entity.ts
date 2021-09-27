import {
  Column,
  CreateDateColumn,
  DeepPartial,
  Entity,
  UpdateDateColumn,
} from 'typeorm';
import { snowflake } from '../../../helpers/common';
import { GENDER } from '@ducnguyen96/ducnguyen96-apis-common-types';

@Entity({
  name: 'users',
})
export class UserEntity {
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Column({ length: 50, name: 'username', nullable: false })
  username: string;

  @Column({
    name: 'avatar',
    nullable: false,
    default: 'https://robohash.org/honey?set=set1',
  })
  avatar: string;

  @Column({ nullable: true, name: 'password' })
  password: string;

  @Column({ nullable: true, name: 'password_salt' })
  passwordSalt: string;

  @Column({ name: 'remind_me', nullable: false, default: true })
  remindMe: boolean;

  @CreateDateColumn({ name: 'wake_up_time', nullable: false })
  wakeUpTime: Date;

  @CreateDateColumn({ name: 'sleep_time', nullable: false })
  sleepTime: Date;

  @Column({
    name: 'gender',
    nullable: false,
    enum: GENDER,
    default: GENDER.MALE,
  })
  gender: GENDER;

  @Column({ name: 'weight', nullable: false, default: 50 })
  weight: number;

  @Column({ name: 'daily_intake', nullable: false, default: 2000 })
  dailyIntake: number;

  @Column({
    name: 'container_image',
    nullable: false,
    default: 'images/glass-of-water.png',
  })
  containerImage: string;

  @Column({ name: 'container_volume', nullable: false, default: 300 })
  containerVolume: number;

  @Column({ name: 'drink_at_a_time', nullable: false, default: 300 })
  drinkAtATime: number;

  @Column({ name: 'vapid_key', nullable: true })
  vapidKey?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: DeepPartial<UserEntity>) {
    Object.assign(this, { id: snowflake.nextId().toString(), ...partial });
  }
}
