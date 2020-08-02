import config from '@app/config';
import { UserService } from '@app/modules/users/services';
import { InvalidCredentials } from '@app/utils/exceptions';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserLoginResponseDto, UserLoginDto } from '../dtos';
import { Token } from '../interfaces/index.';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(user_login: UserLoginDto): Promise<UserLoginResponseDto> {
    const user = await this.userService.findByCredentials(
      user_login.email,
      user_login.password,
    );

    if (!user) throw new InvalidCredentials();

    const payload: Token = {
      user_id: user.id,
      email: user.email,
      roles: user.roles,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      expiries_in: config.jwt.expiries,
    };
  }
}
