import * as mongoose from 'mongoose';

import config from '@app/config';

import { Provider } from '@nestjs/common';

const databaseProviders: Provider[] = [];

if (process.env.NODE_ENV === 'test') {
  databaseProviders.push({
    provide: 'DATABASE_CONNECTION',
    useFactory: () => {},
  });
} else {
  databaseProviders.push({
    provide: 'DATABASE_CONNECTION',
    useFactory: () =>
      mongoose.connect(config.database.url, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }),
  });
}

export default databaseProviders;
