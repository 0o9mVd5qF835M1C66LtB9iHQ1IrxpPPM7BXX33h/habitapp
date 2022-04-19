import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNumber } from "class-validator";

export class FindAllCompletedDatesInput {
  @IsNumber()
  @ApiProperty()
  startDate: number;

  @IsNumber()
  @ApiProperty()
  endDate: number;

  @IsMongoId()
  @ApiProperty()
  habitId: string;
}

export class CreateCompletedDateInput {
  @IsNumber()
  @ApiProperty()
  date: number;

  @IsMongoId()
  @ApiProperty()
  habitId: string;

  @IsMongoId()
  @ApiProperty()
  userId: string;
}
