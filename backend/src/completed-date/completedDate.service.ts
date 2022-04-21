import { Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CompletedDate, CompletedDateDocument } from "./completedDate.schema";
import {
  CreateCompletedDateInput,
  FindAllCompletedDatesInput,
} from "./completedDate.dto";
import { HabitService } from "src/habit/habit.service";

@Injectable()
export class CompletedDateService {
  constructor(
    @InjectModel(CompletedDate.name)
    private completedDateModel: Model<CompletedDateDocument>,
    private habitService: HabitService,
  ) {}

  async findAllByRange(input: FindAllCompletedDatesInput) {
    return this.completedDateModel.find({
      ...(input.habitId ? { habitId: new Types.ObjectId(input.habitId) } : {}),
      date: {
        $gte: input.startDate,
        $lte: input.endDate,
      },
    });
  }

  async createCompletedDate(input: CreateCompletedDateInput) {
    await this.habitService.addNewDateToCurrentStreak(
      input.habitId,
      input.date,
    );
    return await this.completedDateModel.create(input);
  }

  async deleteCompletedDate(completedDateId: string) {
    const deletedCompletedDate =
      await this.completedDateModel.findByIdAndDelete(
        new Types.ObjectId(completedDateId),
      );

    await this.habitService.removeDateFromCurrentStreak(
      deletedCompletedDate.habitId,
      deletedCompletedDate.date,
    );

    await this.habitService.removeDateFromLongestStreak(
      deletedCompletedDate.habitId,
      deletedCompletedDate.date,
    );

    return deletedCompletedDate;
  }
}
