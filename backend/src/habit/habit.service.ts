import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Schema } from "mongoose";
import dayjs from "dayjs";

import { CreateHabitInput, EditHabitInput } from "./habit.dto";
import { Habit, HabitDocument } from "./habit.schema";

@Injectable()
export class HabitService {
  constructor(
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>,
  ) {}

  async findAllByUserId(userId: string): Promise<Habit[]> {
    const habits = await this.habitModel
      .find({ userId })
      .sort({ dateCreated: "desc" });

    for (const habit of habits) {
      const isValidCurrentStrake = this.validateCurrentStreak(habit);

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

  private async validateCurrentStreak(habit: Habit) {
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
