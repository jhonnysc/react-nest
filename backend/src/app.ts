import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { Heimdall } from './middlewares';
import { AuthModule } from './modules/auth';
import { DatabaseModule } from './modules/database';
import { RolesModule } from './modules/permissions';
import { UserModule } from './modules/users';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, RolesModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Heimdall)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
