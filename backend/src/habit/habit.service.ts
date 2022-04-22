import { Model } from "mongoose";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Types } from "mongoose";

import {
  CreateHabitInput,
  EditHabitInput,
  UpdateHabitCompletedDatesInput,
} from "./habit.dto";
import { Habit, HabitDocument } from "./habit.schema";

@Injectable()
export class HabitService {
  constructor(
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>,
  ) {}

  async updateHabitCompletedDates(input: UpdateHabitCompletedDatesInput) {
    const { completedDates, habitId } = input;
    const habit = await this.habitModel.findById(habitId);

    if (!habit) {
      throw new BadRequestException(`Habit with id ${habitId} not found.`);
    }

    habit.completedDates = completedDates;
    return await habit.save();
  }

  async findAllByUserId(userId: Types.ObjectId): Promise<Habit[]> {
    const habits = await this.habitModel
      .find({ userId })
      .sort({ dateCreated: "desc" });

    return habits;
  }

  async createHabit(createHabitInput: CreateHabitInput): Promise<Habit> {
    return await this.habitModel.create(createHabitInput);
  }

  async editHabit(
    habitId: Types.ObjectId,
    editHabitInput: EditHabitInput,
  ): Promise<Habit> {
    return await this.habitModel.findByIdAndUpdate(habitId, editHabitInput, {
      new: true,
    });
  }

  async deleteHabit(id: string): Promise<Habit> {
    return await this.habitModel.findByIdAndDelete(id);
  }
}
