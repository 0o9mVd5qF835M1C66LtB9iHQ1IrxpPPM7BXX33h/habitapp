import { IsMongoId, IsNumber } from "class-validator";
import { Schema } from "mongoose";

export class CreateCompletedDateInput {
  @IsNumber()
  date: number;

  @IsMongoId()
  habitId: Schema.Types.ObjectId;

  @IsMongoId()
  userId: Schema.Types.ObjectId;
}
