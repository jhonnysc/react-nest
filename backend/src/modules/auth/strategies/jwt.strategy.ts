import { Strategy, ExtractJwt } from 'passport-jwt';

import config from '@app/config';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Token } from '../interfaces/index.';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: Token) {
    return {
      user_id: payload.user_id,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
