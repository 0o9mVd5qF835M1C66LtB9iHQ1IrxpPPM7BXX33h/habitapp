import { Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CompletedDate, CompletedDateDocument } from "./completedDate.schema";
import {
  CreateCompletedDateInput,
  FindAllCompletedDatesInput,
} from "./completedDate.dto";

@Injectable()
export class CompletedDateService {
  constructor(
    @InjectModel(CompletedDate.name)
    private completedDateModel: Model<CompletedDateDocument>,
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

  async createCompletedDate(
    createCompletedDateInput: CreateCompletedDateInput,
  ) {
    return await this.completedDateModel.create(createCompletedDateInput);
  }

  async deleteCompletedDate(completedDateId: string) {
    return await this.completedDateModel.findByIdAndDelete(
      new Types.ObjectId(completedDateId),
    );
  }
}
