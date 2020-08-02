import config from '@app/config';

import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../users';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiries },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
