import { Types } from "mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMongoId, IsNumber, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class FindAllCompletedDatesInput {
  @IsNumber()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  startDate: number;

  @IsNumber()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  endDate: number;

  @IsMongoId()
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : value))
  @IsOptional()
  habitId?: string;
}

export class CreateCompletedDateInput {
  @IsNumber()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  date: number;

  @IsMongoId()
  @ApiProperty({
    type: "string",
  })
  @Transform(({ value }) => new Types.ObjectId(value))
  habitId: Types.ObjectId;

  @IsMongoId()
  @ApiProperty()
  @Transform(({ value }) => new Types.ObjectId(value))
  userId: Types.ObjectId;
}
