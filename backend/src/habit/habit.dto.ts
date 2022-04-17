import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class CreateHabitInput {
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsMongoId()
  @ApiProperty()
  userId: string;

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
