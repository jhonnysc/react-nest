import { UserRepository } from "@app/modules/users/repositories";

import { MockType } from "./mock.types";

const userRepositoryMockFactory: () => MockType<UserRepository> = jest.fn(
  () => ({
    create: jest.fn((entity) => entity),
    paginate: jest.fn((entity) => entity),
    findOne: jest.fn((entity) => entity),
    update: jest.fn((entity) => entity),
    deleteOne: jest.fn((entity) => entity),
  }),
);

export default userRepositoryMockFactory;
