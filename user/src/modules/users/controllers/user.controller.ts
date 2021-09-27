import { CreateUserInterface } from '@ducnguyen96/ducnguyen96-apis-common-types';
import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateUserInterface): Promise<UserEntity> {
    const result = await this.usersService.createUser(body);
    return result;
  }
}
