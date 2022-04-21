import { Types } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsBoolean,
  IsInstance,
  IsNotEmpty,
  IsNumber,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateHabitInput {
  @IsInstance(Types.ObjectId)
  @Transform(({ value }) => new Types.ObjectId(value))
  @ApiProperty({
    type: "string",
  })
  _id: Types.ObjectId;

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsInstance(Types.ObjectId)
  @Transform(({ value }) => new Types.ObjectId(value))
  @ApiProperty({
    type: "string",
  })
  userId: Types.ObjectId;

  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  isoWeekdays: number[];

  @IsNumber()
  @ApiProperty()
  dateCreated: number;

  @IsBoolean()
  @ApiProperty()
  archived: boolean;

  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  currentStreakDates: number[];

  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  longestStreakDates: number[];
}

export class EditHabitInput {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  isoWeekdays: number[];
}
