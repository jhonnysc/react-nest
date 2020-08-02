import { MockType } from '@root/mocks/mock.types';
import { internet, name } from 'faker';
import { Types } from 'mongoose';
import * as request from 'supertest';

import { AuthModule } from '@app/modules/auth';
import { Token } from '@app/modules/auth/interfaces/index.';
import { RolesModule } from '@app/modules/permissions';
import { Roles } from '@app/modules/permissions/roles';
import { UserModule } from '@app/modules/users';
import { UserRepository } from '@app/modules/users/repositories';

import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('@app/modules/users/repositories');

describe('User Create (POST) (e2e) with Permissions', () => {
  let app: INestApplication;
  let userRepository: MockType<UserRepository>;
  const user = {
    name: 'Jhonny',
    email: 'email@emai2l.com',
    password: '3XEjiz4$Do%t',
    sex: 'Male',
    hobby: 'Developer',
    dayOfBirth: '1991/04/22',
    age: 29,
    roles: [Roles.ADMIN],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, RolesModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get(UserRepository);

    await app.init();
  });

  it('/Should create user', () => {
    userRepository.findOne.mockReturnValueOnce(
      new Promise(resolve => resolve(null)),
    );

    userRepository.create.mockReturnValueOnce(
      new Promise(resolve => resolve(user)),
    );

    return request(app.getHttpServer())
      .post('/perms/developers')
      .send(user)
      .expect(201)
      .expect(({ body }) => {
        expect(body.name).toEqual(user.name);
        expect(body.email).toEqual(user.email);
      });
  });

  it('/Should deny create user with dupe email', () => {
    userRepository.findOne.mockReturnValueOnce(
      new Promise(resolve => resolve(user)),
    );
    return request(app.getHttpServer())
      .post('/perms/developers')
      .send(user)
      .expect(422)
      .expect(({ body }) => expect(body.code).toEqual(2000));
  });
});

describe('User (GET) (e2e) with Permissions', () => {
  let app: INestApplication;
  let userRepository: MockType<UserRepository>;
  let jwtService: JwtService;
  let admin_token: string;
  let user_token: string;
  const admin_user = {
    name: name.firstName(),
    email: internet.email(),
    password: 'Safe@Password123',
    roles: [Roles.ADMIN],
  };

  const user = {
    name: name.firstName(),
    email: internet.email(),
    password: 'Safe@Password123',
    roles: [Roles.USER],
  };

  const admin_payload: Token = {
    email: admin_user.email,
    roles: admin_user.roles,
    user_id: Types.ObjectId().toHexString(),
  };

  const user_payload: Token = {
    email: user.email,
    roles: user.roles,
    user_id: Types.ObjectId().toHexString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, RolesModule, AuthModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get(UserRepository);

    jwtService = module.get(JwtService);

    admin_token = jwtService.sign(admin_payload);
    user_token = jwtService.sign(user_payload);

    await app.init();
  });

  it('/Should not bring users without valid token', () => {
    return request(app.getHttpServer())
      .get('/perms/developers')
      .set('authorization', 'invalid-token')
      .expect(401);
  });

  it('/Admin should bring users with pagination', () => {
    userRepository.paginate.mockReturnValueOnce(
      new Promise(resolve =>
        resolve({
          items: [],
          meta: {
            total_items: 0,
            item_count: 0,
            items_per_page: 10,
            total_pages: 0,
            current_page: 1,
          },
          links: {
            first: '/users?limit=10',
            previous: '',
            next: '',
            last: '/users?page=0&limit=10',
          },
        }),
      ),
    );

    return request(app.getHttpServer())
      .get('/perms/developers')
      .set('authorization', `Bearer ${admin_token}`)
      .expect(200)
      .expect(({ body }) => {
        expect(body.items).toBeDefined();
        expect(body.meta).toBeDefined();
        expect(body.links).toBeDefined();
      });
  });

  it('/User should not bring users', () => {
    return request(app.getHttpServer())
      .get('/perms/developers')
      .set('authorization', `Bearer ${user_token}`)
      .expect(403);
  });
});

describe('User (PUT) (e2e) with Permissions', () => {
  let app: INestApplication;
  let userRepository: MockType<UserRepository>;
  let jwtService: JwtService;
  let admin_token: string;
  let user_token: string;
  const admin_user = {
    name: name.firstName(),
    email: internet.email(),
    password: 'Safe@Password123',
    roles: [Roles.ADMIN],
  };

  const user = {
    name: name.firstName(),
    email: internet.email(),
    password: 'Safe@Password123',
    roles: [Roles.USER],
  };

  const admin_payload: Token = {
    email: admin_user.email,
    roles: admin_user.roles,
    user_id: Types.ObjectId().toHexString(),
  };

  const user_payload: Token = {
    email: user.email,
    roles: user.roles,
    user_id: Types.ObjectId().toHexString(),
  };

  const update_payload = {
    name: 'Jhonny',
    email: 'email_updated@email.com',
    sex: 'Male',
    hobby: 'Developer',
    dayOfBirth: '1991/04/22',
    age: 29,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, RolesModule, AuthModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get(UserRepository);

    jwtService = module.get(JwtService);

    admin_token = jwtService.sign(admin_payload);
    user_token = jwtService.sign(user_payload);

    await app.init();
  });

  it('/Should not bring users without valid token', () => {
    return request(app.getHttpServer())
      .get('/perms/developers')
      .set('authorization', 'invalid-token')
      .expect(401);
  });

  it('/Should deny update user without perms', () => {
    userRepository.update.mockReturnValueOnce(
      new Promise(resolve => resolve({ _id: 1 })),
    );
    return request(app.getHttpServer())
      .put(`/perms/developers/${Types.ObjectId()}`)
      .send(update_payload)
      .set('authorization', `Bearer ${user_token}`)
      .expect(403);
  });

  it('/Should update user', () => {
    userRepository.update.mockReturnValueOnce(
      new Promise(resolve => resolve({ _id: 1 })),
    );
    return request(app.getHttpServer())
      .put(`/perms/developers/${Types.ObjectId()}`)
      .send(update_payload)
      .set('authorization', `Bearer ${admin_token}`)
      .expect(200);
  });

  it('/Should deny getting user without perm', () => {
    userRepository.update.mockReturnValueOnce(
      new Promise(resolve => resolve({ _id: 1 })),
    );
    return request(app.getHttpServer())
      .get(`/perms/developers/${Types.ObjectId()}`)
      .set('authorization', `Bearer ${user_token}`)
      .expect(403);
  });

  it('/Should get user', () => {
    userRepository.findOne.mockReturnValueOnce(
      new Promise(resolve => resolve({ _id: 1 })),
    );
    return request(app.getHttpServer())
      .get(`/perms/developers/${Types.ObjectId()}`)
      .set('authorization', `Bearer ${admin_token}`)
      .expect(200);
  });

  it('/Should deny deleting user without perm', () => {
    return request(app.getHttpServer())
      .delete(`/perms/developers/${Types.ObjectId()}`)
      .set('authorization', `Bearer ${user_token}`)
      .expect(403);
  });

  it('/Should delete user', () => {
    userRepository.deleteOne.mockReturnValueOnce(
      new Promise(resolve => resolve({ _id: 1 })),
    );
    return request(app.getHttpServer())
      .delete(`/perms/developers/${Types.ObjectId()}`)
      .set('authorization', `Bearer ${admin_token}`)
      .expect(204);
  });
});
