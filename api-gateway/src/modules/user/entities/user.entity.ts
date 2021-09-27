import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { snowflake } from 'src/helpers/common';
import {
  Column,
  CreateDateColumn,
  DeepPartial,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({
  name: 'users',
})
export class UserEntity {
  @Field(() => ID)
  @Column('bigint', {
    primary: true,
    unsigned: true,
  })
  id: string;

  @Field(() => String, { nullable: false })
  @Column({ length: 50, name: 'username', nullable: false })
  username: string;

  @HideField()
  @Column({ nullable: true, name: 'password' })
  password: string;

  @HideField()
  @Column({ nullable: true, name: 'password_salt' })
  passwordSalt: string;

  @Field(() => Date)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(partial: DeepPartial<UserEntity>) {
    Object.assign(this, { id: snowflake.nextId().toString(), ...partial });
  }
}
