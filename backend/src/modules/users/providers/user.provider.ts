/* eslint-disable global-require */
import { Connection } from 'mongoose';

import { Provider } from '@nestjs/common/interfaces';

import { UserSchema } from '../models';

const userProviders: Provider[] = [];

if (process.env.NODE_ENV === 'test') {
  userProviders.push({
    provide: 'USER_MODEL',
    useFactory: () => require('@root/mocks/user.repository.mock'),
  });
} else {
  userProviders.push({
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('users', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  });
}

export { userProviders };
