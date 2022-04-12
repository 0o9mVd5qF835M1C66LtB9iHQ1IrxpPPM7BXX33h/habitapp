import { ArrayNotEmpty } from "class-validator";

export class CreateHabitInput {
  title: string;

  userId: string;

  @ArrayNotEmpty()
  isoWeekdays: number[];

  dateCreated: number;

  archived: boolean;

  currentStreakDates: number[];

  longestStreakDates: number[];
}

export class EditHabitInput {
  _id: string;

  title: string;

  @ArrayNotEmpty()
  isoWeekdays: number[];
}
