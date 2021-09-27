import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilsProvider } from 'src/providers/utils.provider';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { getConnection } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { RegisterPayload } from './dto/RegisterPayload';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserLoginInput } from './dto/UserLogin.input';
import { UserRegisterInput } from './dto/UserRegister.input';
import * as bcrypt from 'bcryptjs';
import axios from 'axios';
import { CreateUserInterface } from '@ducnguyen96/ducnguyen96-apis-common-types';

@Injectable()
export class AuthService {
  constructor(
    public readonly jwtService: JwtService,
    public readonly configService: ApiConfigService,
    public readonly userService: UserService,
  ) {}

  async register(input: UserRegisterInput): Promise<RegisterPayload> {
    const queryRunner = getConnection().createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // create user
      const { username, password, repeatPassword } = input;
      if (password !== repeatPassword) {
        throw new BadRequestException(
          'Password and repeat password are differnet !',
        );
      }

      const userRepository = getConnection().getRepository(UserEntity);

      // check username existed
      const userWithUsername = await userRepository.findOne({
        where: { username },
      });

      if (userWithUsername !== undefined) {
        throw new BadRequestException('Username has been used !');
      }

      const user = userRepository.create({ ...input });

      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);
      user.passwordSalt = salt;

      await queryRunner.manager.save(user);

      // Send a request to UserServce to create an user
      const createUserBody: CreateUserInterface = { ...user };
      await axios.post(process.env.USER_SERVICE_URL, createUserBody);

      // Create jwt
      const jwt = await this.createToken(user.id);
      // await queryRunner.commitTransaction();

      return { token: jwt, user };
    } catch (err) {
      console.error(err);
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async createToken(id: string): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({ id }),
    });
  }

  async validateUser(userLoginInput: UserLoginInput): Promise<UserEntity> {
    const user = await this.userService.findOne({
      username: userLoginInput.username,
    });

    if (!user) {
      throw new NotFoundException('username or password is not correct !');
    }

    const isPasswordValid = await UtilsProvider.validateHash(
      userLoginInput.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new NotFoundException('username or password is not correct !');
    }
    return user;
  }
}
