import {
  ArrayNotEmpty,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class CreateHabitInput {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  userId: string;

  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  isoWeekdays: number[];

  @IsNotEmpty()
  dateCreated: number;

  @IsNotEmpty()
  @IsBoolean()
  archived: boolean;

  @IsNumber({}, { each: true })
  currentStreakDates: number[];

  @IsNumber({}, { each: true })
  longestStreakDates: number[];
}

export class EditHabitInput {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  title: string;

  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  isoWeekdays: number[];
}
