import { Types } from "mongoose";

import { Roles } from "@app/modules/permissions/roles";
import { UsersController } from "@app/modules/users/controllers";
import { UserResponseDto } from "@app/modules/users/dtos";
import { UserSchema } from "@app/modules/users/models";
import { UserRepository } from "@app/modules/users/repositories";
import { UserService } from "@app/modules/users/services";
import { Pagination } from "@app/utils/pagination/pagination";

jest.mock("@app/modules/users/repositories");

describe("User Create (POST) (unit)", () => {
  let userController: UsersController;
  let userService: UserService;
  let userRepository: UserRepository;
  let userModel: any;

  const user: UserResponseDto = {
    _id: "1",
    createdAt: new Date(),
    email: "email@email.com",
    name: "jhonny",
    roles: ["ADMIN"],
    updatedAt: new Date(),
    age: 20,
    dayOfBirth: "1991/25/04",
    hobby: "dev",
    sex: "male",
  };

  beforeEach(async () => {
    userModel = UserSchema;
    userRepository = new UserRepository(userModel);
    userService = new UserService(userRepository);
    userController = new UsersController(userService);
  });

  it("/Should create user", async () => {
    jest.spyOn(userService, "create").mockImplementation(() =>
      new Promise((resolve) => resolve(user))
    );

    expect(
      await userController.create(
        {
          email: "jhonny@gmail.com",
          name: "jhonny",
          password: "123",
          roles: [Roles.ADMIN],
          age: 20,
          dayOfBirth: new Date("1991/25/04"),
          hobby: "dev",
          sex: "male",
        },
      ),
    ).toBe(user);
  });

  it("/Should get users", async () => {
    const pagination: Pagination<UserResponseDto> = {
      items: [user],
      meta: {
        current_page: 1,
        item_count: 10,
        items_per_page: 10,
        total_items: 10,
        total_pages: 10,
      },
      links: { first: "url", last: "url", next: "urll", previous: "url" },
    };

    jest.spyOn(userService, "get").mockImplementation(() =>
      new Promise((resolve) => resolve(pagination))
    );

    expect(
      await userController.get(
        { limit: 10, page: 1 },
      ),
    ).toBe(pagination);
  });

  it("/Should update users", async () => {
    const updateUser = { ...user, email: "jhonny@update.com" };
    jest.spyOn(userService, "updateOwn").mockImplementation(() =>
      new Promise((resolve) => resolve(updateUser))
    );

    expect(
      await userController.updateOwn(
        {
          name: "jhonny",
          age: 25,
          dayOfBirth: new Date("1991/25/04"),
          email: "email@email.com",
          hobby: "dev",
          sex: "male",
        },
        {
          user: {
            user_id: "1",
            email: "jhonny@update.com",
            roles: [Roles.ADMIN],
          },
        },
      ),
    ).toBe(updateUser);
  });

  it("/Should update any user", async () => {
    const updateUser = { ...user, email: "jhonny@update.com" };
    jest.spyOn(userService, "updateAny").mockImplementation(() =>
      new Promise((resolve) => resolve(updateUser))
    );

    expect(
      await userController.updateUser(
        {
          name: "jhonny",
          age: 25,
          dayOfBirth: new Date("1991/25/04"),
          email: "email@email.com",
          hobby: "dev",
          sex: "male",
        },
        { id: Types.ObjectId() },
      ),
    ).toBe(updateUser);
  });

  it("/Should get any user", async () => {
    jest.spyOn(userService, "getAnyUser").mockImplementation(() =>
      new Promise((resolve) => resolve(user))
    );

    expect(
      await userController.getAnyUser(
        { id: Types.ObjectId() },
      ),
    ).toBe(user);
  });

  it("/Should delete any user", async () => {
    jest.spyOn(userService, "getAnyUser").mockImplementation(() =>
      new Promise((resolve) => resolve())
    );

    expect(
      await userController.getAnyUser(
        { id: Types.ObjectId() },
      ),
    ).toBeUndefined();
  });
});
