import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { CreateUserInterface } from '@ducnguyen96/ducnguyen96-apis-common-types';
@Injectable()
export class UserService {
  constructor(public readonly userRepository: UserRepository) {}
  findOne(
    findData: FindConditions<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(findData);
  }

  async createUser(input: CreateUserInterface): Promise<UserEntity> {
    const user = this.userRepository.create({ ...input, id: input.id });
    const wakeUpTime = new Date();
    wakeUpTime.setDate(wakeUpTime.getDate() - 1);
    wakeUpTime.setHours(22);
    wakeUpTime.setMinutes(0);

    const sleepTime = new Date();
    sleepTime.setDate(sleepTime.getDate());
    sleepTime.setHours(16);
    sleepTime.setMinutes(0);

    user.wakeUpTime = wakeUpTime;
    user.sleepTime = sleepTime;

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(input.password, salt);
    user.passwordSalt = salt;
    return this.userRepository.save(user);
  }

  async updateUserVapidKey(
    user: UserEntity,
    vapidKey: string,
  ): Promise<string> {
    const updated = await this.userRepository.save({ ...user, vapidKey });
    return updated.vapidKey;
  }
}
