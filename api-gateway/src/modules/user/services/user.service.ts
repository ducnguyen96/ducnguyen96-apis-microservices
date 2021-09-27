import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
@Injectable()
export class UserService {
  constructor(public readonly userRepository: UserRepository) {}
  findOne(
    findData: FindConditions<UserEntity>,
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne(findData);
  }
}
