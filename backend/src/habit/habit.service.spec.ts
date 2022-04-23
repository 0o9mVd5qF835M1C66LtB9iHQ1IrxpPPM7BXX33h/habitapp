import { Test } from "@nestjs/testing";
import { Types } from "mongoose";

import { UserModule } from "../user/user.module";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { DatabaseModule } from "../database/database.module";
import { HabitFactory } from "./habit.factory";
import { HabitModule } from "./habit.module";
import { HabitService } from "./habit.service";

describe("Habit service", () => {
  let tempUser: User;
  let habitService: HabitService;

  beforeEach(async () => {
    const modules = await Test.createTestingModule({
      imports: [DatabaseModule, HabitModule, UserModule],
    }).compile();

    habitService = await modules.resolve(HabitService);

    const userService: UserService = await modules.resolve(UserService);
    tempUser = await userService.createTempUser();
  });

  // describe("method createHabit", () => {});

  describe("method findAllByUserId", () => {
    it("should get all habits of the user, by user id", async () => {
      const savedHabits = await Promise.all([
        habitService.createHabit(
          HabitFactory.create({
            title: "Habit 1",
            userId: tempUser._id,
          }),
        ),
        habitService.createHabit(
          HabitFactory.create({
            title: "Habit 2",
            userId: tempUser._id,
          }),
        ),
      ]);

      const foundHabits = await habitService.findAllByUserId(tempUser._id);

      expect(foundHabits).toHaveLength(savedHabits.length);
    });

    it("should not get habits of another user, by different user id", async () => {
      const anotherUserId = new Types.ObjectId();
      const savedHabits = await Promise.all([
        habitService.createHabit(
          HabitFactory.create({
            userId: tempUser._id,
          }),
        ),
        habitService.createHabit(
          HabitFactory.create({
            userId: tempUser._id,
          }),
        ),
        habitService.createHabit(
          HabitFactory.create({
            userId: anotherUserId,
          }),
        ),
      ]);

      const foundHabits = await habitService.findAllByUserId(anotherUserId._id);

      expect(foundHabits).toHaveLength(
        savedHabits.filter((habit) => habit.userId === anotherUserId).length,
      );
    });
  });
});
