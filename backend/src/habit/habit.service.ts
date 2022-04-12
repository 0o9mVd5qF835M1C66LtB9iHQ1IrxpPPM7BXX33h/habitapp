import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CreateHabitInput, EditHabitInput } from "./habit.dto";
import { Habit, HabitDocument } from "./habit.schema";

@Injectable()
export class HabitService {
  constructor(
    @InjectModel(Habit.name) private habitModel: Model<HabitDocument>,
  ) {}

  async findAll(userId: string): Promise<Habit[]> {
    return this.habitModel.find({ userId });
  }

  async createHabit(createHabitInput: CreateHabitInput): Promise<Habit> {
    return await this.habitModel.create(createHabitInput);
  }

  async editHabit(editHabitInput: EditHabitInput): Promise<Habit> {
    return await this.habitModel.findByIdAndUpdate(
      editHabitInput._id,
      editHabitInput,
      { new: true },
    );
  }
}
