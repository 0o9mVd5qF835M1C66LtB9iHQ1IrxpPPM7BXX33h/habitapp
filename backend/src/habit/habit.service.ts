import { Model } from "mongoose";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Schema, Types } from "mongoose";
import dayjs from "dayjs";

import { CreateHabitInput, EditHabitInput } from "./habit.dto";
import { Habit, HabitDocument } from "./habit.schema";

@Injectable()
export class HabitService {
  constructor(
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>,
  ) {}

  async findAllByUserId(userId: Types.ObjectId): Promise<Habit[]> {
    const habits = await this.habitModel
      .find({ userId })
      .sort({ dateCreated: "desc" });

    for (const habit of habits) {
      const isValidCurrentStrake = this.isValidCurrentStreak(habit);

      if (!isValidCurrentStrake) {
        habit.currentStreakDates = [];
        await habit.save();
        continue;
      }
    }

    return habits;
  }

  async createHabit(createHabitInput: CreateHabitInput): Promise<Habit> {
    return await this.habitModel.create(createHabitInput);
  }

  async editHabit(
    habitId: Schema.Types.ObjectId,
    editHabitInput: EditHabitInput,
  ): Promise<Habit> {
    return await this.habitModel.findByIdAndUpdate(habitId, editHabitInput, {
      new: true,
    });
  }

  async deleteHabit(id: string): Promise<Habit> {
    return await this.habitModel.findByIdAndDelete(id);
  }

  async addNewDateToCurrentStreak(
    habitId: Types.ObjectId,
    newCompletedDate: number,
  ) {
    const habit = await this.habitModel.findById(habitId);

    if (!habit) {
      throw new BadRequestException(`Habit with _id ${habitId} not found!`);
    }

    for (const completedDate of habit.currentStreakDates) {
      if (dayjs(completedDate).isSame(newCompletedDate, "day")) {
        throw new BadRequestException("Date has been already completed!");
      }
    }

    habit.currentStreakDates.push(newCompletedDate);

    if (habit.currentStreakDates.length > habit.longestStreakDates.length) {
      habit.longestStreakDates = habit.currentStreakDates;
    }

    await habit.save();
  }

  async removeDateFromCurrentStreak(
    habitId: Types.ObjectId,
    deletedCompletedDate: number,
  ) {
    const habit = await this.habitModel.findById(habitId);

    if (!habit) {
      throw new BadRequestException(`Habit with _id ${habitId} not found!`);
    }

    // Pick only dates that are after deleted date, so that current streak is valid
    habit.currentStreakDates = habit.currentStreakDates.filter((date) =>
      dayjs(date).isAfter(deletedCompletedDate, "day"),
    );

    await habit.save();
  }

  async removeDateFromLongestStreak(
    habitId: Types.ObjectId,
    deletedCompletedDate: number,
  ) {
    const habit = await this.habitModel.findById(habitId);

    if (!habit) {
      throw new BadRequestException(`Habit with _id ${habitId} not found!`);
    }

    const indexInsideLongestStreakDate = habit.longestStreakDates.findIndex(
      (date) => dayjs(date).isSame(deletedCompletedDate, "day"),
    );

    const isInLongestStreakDates = indexInsideLongestStreakDate === -1;
    if (!isInLongestStreakDates) {
      return;
    }

    const middleIndexOfLongestStreakDates = habit.longestStreakDates.length / 2;

    const pickRightHandDates =
      indexInsideLongestStreakDate > middleIndexOfLongestStreakDates;

    if (pickRightHandDates) {
      habit.longestStreakDates.slice(
        indexInsideLongestStreakDate,
        habit.longestStreakDates.length,
      );
    } else {
      habit.longestStreakDates.slice(0, indexInsideLongestStreakDate);
    }

    await habit.save();
  }

  private async isValidCurrentStreak(habit: Habit) {
    const hasCurrentStrake = !!habit.currentStreakDates.length;

    if (hasCurrentStrake) {
      for (let i = 1; i <= 7; i++) {
        const date = dayjs().subtract(i, "day");
        const shouldBeCompleted = habit.isoWeekdays.includes(date.isoWeekday());

        if (!shouldBeCompleted) {
          continue;
        }

        const isCompleted = habit.currentStreakDates.some((completedDate) => {
          return dayjs(completedDate).isSame(date, "day");
        });

        if (isCompleted) {
          return true;
        }
      }
    }

    return false;
  }
}
