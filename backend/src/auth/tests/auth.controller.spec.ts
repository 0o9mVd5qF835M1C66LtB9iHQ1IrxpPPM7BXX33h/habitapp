import { Test, TestingModule } from "@nestjs/testing";
import { Types } from "mongoose";

import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";

jest.mock("../auth.service");

describe("Auth controller", () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = await moduleRef.resolve(AuthController);
    authService = await moduleRef.resolve(AuthService);

    jest.clearAllMocks();
  });

  it("should be defined", async () => {
    expect(authController).toBeDefined();
  });

  it("should call authService register method", async () => {
    const expectedResult = { accessToken: "token" };

    jest
      .spyOn(authService, "register")
      .mockImplementation(async () => expectedResult);

    const actualResult = await authController.register({
      email: "email",
      password: "password",
      tempUserId: new Types.ObjectId(),
    });

    expect(actualResult).toBe(expectedResult);
  });

  it("should call authService login method", async () => {
    const expectedResult = { accessToken: "token" };

    jest
      .spyOn(authService, "login")
      .mockImplementation(async () => expectedResult);

    const actualResult = await authController.login({
      email: "email",
      password: "password",
    });

    expect(actualResult).toBe(expectedResult);
  });

  it("should call authService tempRegister method", async () => {
    const expectedResult = { accessToken: "token" };

    jest
      .spyOn(authService, "registerTempUser")
      .mockImplementation(async () => expectedResult);

    const actualResult = await authController.tempRegister();

    expect(actualResult).toBe(expectedResult);
  });
});
