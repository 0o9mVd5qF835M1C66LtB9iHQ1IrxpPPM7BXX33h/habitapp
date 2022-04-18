import { Model, Types } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { CompletedDate, CompletedDateDocument } from "./completedDate.schema";
import { CreateCompletedDateInput } from "./completedDate.dto";

@Injectable()
export class CompletedDateService {
  constructor(
    @InjectModel(CompletedDate.name)
    private completedDateModel: Model<CompletedDateDocument>,
  ) {}

  async createCompletedDate(
    createCompletedDateInput: CreateCompletedDateInput,
  ) {
    return await this.completedDateModel.create(createCompletedDateInput);
  }

  async findAllByDateAndUser(
    startDate: number,
    endDate: number,
    userId: Types.ObjectId,
  ) {
    return await this.completedDateModel.find({
      userId,
      date: { $gte: startDate, $lte: endDate },
    });
  }
}
