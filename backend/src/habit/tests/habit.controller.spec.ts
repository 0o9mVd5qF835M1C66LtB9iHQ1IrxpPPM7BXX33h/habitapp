import { Test, TestingModule } from "@nestjs/testing";
import { Types, Document } from "mongoose";

import { HabitController } from "../habit.controller";
import { Habit } from "../habit.schema";
import { HabitService } from "../habit.service";

jest.mock("../habit.service");

describe("Auth controller", () => {
  let habitController: HabitController;
  let habitService: HabitService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [HabitController],
      providers: [HabitService],
    }).compile();

    habitController = await moduleRef.resolve(HabitController);
    habitService = await moduleRef.resolve(HabitService);

    jest.clearAllMocks();
  });

  it("should be defined", async () => {
    expect(habitController).toBeDefined();
  });

  it("should call habitSerive findById method", async () => {
    const expectedResult = {
      _id: new Types.ObjectId(),
      userId: new Types.ObjectId(),
      title: "Test Habit",
      isoWeekdays: [1, 2, 3],
      dateCreated: Number(new Date()),
      completedDates: [],
      archived: false,
    };

    jest
      .spyOn(habitService, "findById")
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
