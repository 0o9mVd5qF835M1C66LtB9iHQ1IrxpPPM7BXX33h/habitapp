import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCompletedDateInput {
  @IsNotEmpty()
  @IsNumber()
  date: number;

  @IsNotEmpty()
  habitId: string;

  @IsNotEmpty()
  userId: string;
}
