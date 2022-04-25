import { Test } from "@nestjs/testing";
import { Types } from "mongoose";

import { UserModule } from "../user/user.module";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { DatabaseModule } from "../database/database.module";
import { HabitFactory } from "./habit.factory";
import { HabitModule } from "./habit.module";
import { HabitService } from "./habit.service";
import {
  CreateHabitInput,
  EditHabitInput,
  UpdateHabitCompletedDatesInput,
} from "./habit.dto";

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

  describe("method createHabit", () => {
    it("should create habit and return created document", async () => {
      const input: CreateHabitInput = {
        _id: new Types.ObjectId(),
        userId: tempUser._id,
        archived: false,
        completedDates: [],
        dateCreated: Number(new Date()),
        isoWeekdays: [1, 2, 3, 4],
        title: "Test habit",
      };

      const habit = await habitService.createHabit(input);
      const savedHabits = await habitService.findAllByUserId(tempUser._id);
      
      expect(habit).toMatchObject(input);
      expect(savedHabits).toHaveLength(1);
    });
  });

  describe("method editHabit", () => {
    it("should edit habit and return edited habit", async () => {
      const habit = await habitService.createHabit(
        HabitFactory.create({
          title: "Habit",
          isoWeekdays: [1, 2],
        }),
      );

      const input: EditHabitInput = {
        title: "Updated",
        isoWeekdays: [1, 2, 3],
      };

      const updatedHabit = await habitService.editHabit(habit._id, input);

      expect(updatedHabit.title).toBe(input.title);
      expect(updatedHabit.isoWeekdays).toEqual(input.isoWeekdays);
    });
  });

  describe("method deleteHabit", () => {
    it("should remove habit", async () => {
      const habit = await habitService.createHabit(
        HabitFactory.create({ userId: tempUser._id }),
      );

      await habitService.deleteHabit(habit._id);
      const habits = await habitService.findAllByUserId(tempUser._id);

      expect(habits).toHaveLength(0);
    });
  });

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

    it("should return empty array if no habit exists for user id", async () => {
      const anotherUserId = new Types.ObjectId();

      await Promise.all([
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

      const foundHabits = await habitService.findAllByUserId(anotherUserId);
      expect(foundHabits).toHaveLength(0);
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

  describe("method updateHabitCompletedDates", () => {
    it("should update habit's completed dates", async () => {
      const habit = await habitService.createHabit(
        HabitFactory.create({
          userId: tempUser._id,
          completedDates: [1, 2, 3, 4],
        }),
      );

      const input: UpdateHabitCompletedDatesInput = {
        habitId: habit._id,
        completedDates: [1, 2, 3, 4, 5],
      };

      const updated = await habitService.updateHabitCompletedDates(input);

      expect(updated.completedDates).toEqual(input.completedDates);
    });
  });
});
