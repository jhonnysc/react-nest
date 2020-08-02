import { MockType } from '@root/mocks/mock.types';
import { internet, name } from 'faker';
import { Types } from 'mongoose';
import * as request from 'supertest';

import { AuthModule } from '@app/modules/auth';
import { RolesModule } from '@app/modules/permissions';
import { Roles } from '@app/modules/permissions/roles';
import { UserModule } from '@app/modules/users';
import { UserRepository } from '@app/modules/users/repositories';

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('@app/modules/users/repositories');

describe('Auth user login (POST) (e2e)', () => {
  let app: INestApplication;
  let userRepository: MockType<UserRepository>;
  const user = {
    name: name.firstName(),
    email: internet.email(),
    password: 'Safe@Password123',
    roles: [Roles.ADMIN],
    id: Types.ObjectId().toHexString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, RolesModule, AuthModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get(UserRepository);

    await app.init();
  });

  it('/Should not login with invalid credentials', () => {
    userRepository.findOne.mockReturnValueOnce(
      new Promise(resolve => resolve(null)),
    );

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(401);
  });

  it('/Should correct login', () => {
    userRepository.findOne.mockReturnValueOnce(
      new Promise(resolve => resolve(user)),
    );

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(201)
      .expect(({ body }) => expect(body.access_token).toBeDefined());
  });
});
