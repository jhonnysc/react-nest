import { to } from 'await-to-js';
import { plainToClass } from 'class-transformer';
import * as faker from 'faker';
import { Types } from 'mongoose';

import { Token } from '@app/modules/auth/interfaces/index.';
import { Roles } from '@app/modules/permissions/roles';
import { EmailAlreadyInUse, UserNotFound } from '@app/utils/exceptions';
import {
  throwIfIsInvalidEmail,
  throwIfIsInvalidPassword,
} from '@app/utils/security';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import {
  CreateUserDto,
  UserGetDto,
  UserResponseDto,
  UpdateUserDto,
} from '../dtos';
import { User } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user_dto: CreateUserDto): Promise<UserResponseDto> {
    let err: Error;
    let user: User;

    throwIfIsInvalidEmail(user_dto.email);
    throwIfIsInvalidPassword(user_dto.password);

    [err, user] = await to(
      this.userRepository.findOne({ email: user_dto.email }),
    );

    if (err) throw new InternalServerErrorException();
    if (user) throw new EmailAlreadyInUse();

    [err, user] = await to(this.userRepository.create(user_dto));

    if (err) throw new InternalServerErrorException();

    return plainToClass(UserResponseDto, user);
  }

  async findByCredentials(email: string, password: string) {
    return this.userRepository.findOne({ email, password });
  }

  async updateOwn(user_dto: UpdateUserDto, token: Token) {
    const [err, user] = await to(
      this.userRepository.update({ _id: token.user_id }, user_dto),
    );

    if (err) throw new InternalServerErrorException();

    return plainToClass(UserResponseDto, user);
  }

  async updateAny(user_dto: UpdateUserDto, id: Types.ObjectId) {
    const [err, user] = await to(
      this.userRepository.update({ _id: id }, user_dto),
    );

    if (err) throw new InternalServerErrorException();

    return plainToClass(UserResponseDto, user);
  }

  async getAnyUser(id: Types.ObjectId) {
    const [err, user] = await to(this.userRepository.findOne({ _id: id }));
    if (err) throw new InternalServerErrorException();

    if (!user) throw new UserNotFound();
    return plainToClass(UserResponseDto, user);
  }

  async deleteAnyUser(id: Types.ObjectId) {
    await this.userRepository.deleteOne({ _id: id }).catch(() => {
      throw new InternalServerErrorException();
    });
  }

  async insertUsers(quantity: number) {
    const promises = [];
    for (let i = 0; i < quantity; i += 1) {
      promises.push(
        this.userRepository.create({
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          sex: faker.random.arrayElement(['Male', 'Female']),
          age: faker.random.number(60),
          hobby: faker.random.word(),
          dayOfBirth: faker.date.recent(),
          email: faker.internet.email(),
          roles: [Roles.USER],
          password: faker.internet.password(),
        }),
      );
    }
    await Promise.all(promises);
  }

  async get(query: UserGetDto) {
    const where = {};
    if (query.email) {
      Object.assign(where, { email: { $regex: query.email, $options: 'i' } });
    }
    if (query.name) {
      Object.assign(where, { name: { $regex: query.name, $options: 'i' } });
    }

    return this.userRepository.paginate<UserResponseDto>(
      query,
      where,
      UserResponseDto,
    );
  }
}
