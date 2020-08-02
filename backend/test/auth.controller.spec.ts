import { Model } from "mongoose";

import { AuthController } from "@app/modules/auth/controllers";
import { UserLoginResponseDto } from "@app/modules/auth/dtos";
import { AuthService } from "@app/modules/auth/services";
import { User } from "@app/modules/users/interfaces";
import { UserRepository } from "@app/modules/users/repositories";
import { UserService } from "@app/modules/users/services";

import { JwtService } from "@nestjs/jwt";

jest.mock("@app/modules/users/repositories");

describe("User Create (POST) (unit)", () => {
  let authController: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;
  let userService: UserService;
  let userRepository: UserRepository;
  let userModel: Model<User, {}>;

  const userLogin: UserLoginResponseDto = {
    access_token: "123",
    expiries_in: 30,
  };

  beforeEach(async () => {
    userRepository = new UserRepository(userModel);
    userService = new UserService(userRepository);
    jwtService = new JwtService({
      secret: "123",
      signOptions: { expiresIn: 10 },
    });
    authService = new AuthService(userService, jwtService);
    authController = new AuthController(authService);
  });

  it("/Should login the user", async () => {
    jest.spyOn(authService, "login").mockImplementation(() =>
      new Promise((resolve) => resolve(userLogin))
    );

    expect(
      await authController.login(
        {
          email: "jhonny@gmail.com",
          password: "123",
        },
      ),
    ).toBe(userLogin);
  });
});
