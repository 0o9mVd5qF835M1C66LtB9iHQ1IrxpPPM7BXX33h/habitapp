import { Model } from "mongoose";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
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

  async findById(habitId: Types.ObjectId) {
    const habit = await this.habitModel.findById(habitId);

    if (!habit) {
      new NotFoundException(`Habit with _id ${habitId} not found!`);
    }

    return habit;
  }

  async findAllByUserId(userId: Types.ObjectId): Promise<Habit[]> {
    const habits = await this.habitModel
      .find({ userId })
      .sort({ dateCreated: "desc" });

    return habits;
  }

  async updateHabitCompletedDates(input: UpdateHabitCompletedDatesInput) {
    const { completedDates, habitId } = input;

    const habit = await this.habitModel.findByIdAndUpdate(
      habitId,
      {
        $set: { completedDates },
      },
      { new: true },
    );

    if (!habit) {
      throw new BadRequestException(`Habit with id ${habitId} not found.`);
    }

    return habit;
  }

  async createHabit(createHabitInput: CreateHabitInput): Promise<Habit> {
    return await this.habitModel.create(createHabitInput);
  }

  async editHabit(habitId: Types.ObjectId, editHabitInput: EditHabitInput) {
    const editedHabit = await this.habitModel.findByIdAndUpdate(
      habitId,
      { $set: { ...editHabitInput } },
      {
        new: true,
      },
    );

    console.log(editHabitInput);

    if (!editedHabit) {
      throw new BadRequestException(`Habit not found with id ${habitId}`);
    }

    return editedHabit;
  }

  async deleteHabit(habitId: Types.ObjectId) {
    const deletedHabit = await this.habitModel.findByIdAndDelete(habitId);

    if (!deletedHabit) {
      throw new BadRequestException(`Habit not found with id ${habitId}`);
    }
  }
}
