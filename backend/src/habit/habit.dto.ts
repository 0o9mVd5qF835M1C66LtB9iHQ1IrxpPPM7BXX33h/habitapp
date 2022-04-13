import { ArrayNotEmpty, IsNotEmpty } from "class-validator";

export class CreateHabitInput {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  userId: string;

  @ArrayNotEmpty()
  isoWeekdays: number[];

  @IsNotEmpty()
  dateCreated: number;

  @IsNotEmpty()
  archived: boolean;

  @IsNotEmpty()
  currentStreakDates: number[];

  @IsNotEmpty()
  longestStreakDates: number[];
}

export class EditHabitInput {
  @IsNotEmpty()
  _id: string;

  @IsNotEmpty()
  title: string;

  @ArrayNotEmpty()
  isoWeekdays: number[];
}
