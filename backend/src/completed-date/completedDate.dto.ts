import { Types } from "mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInstance, IsNumber, IsOptional } from "class-validator";
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

  @IsInstance(Types.ObjectId)
  @ApiPropertyOptional({
    type: "string",
  })
  @Transform(({ value }) => (value ? new Types.ObjectId(value) : value))
  @IsOptional()
  habitId?: Types.ObjectId;
}

export class CreateCompletedDateInput {
  @IsInstance(Types.ObjectId)
  @ApiProperty({
    type: "string",
  })
  @Transform(({ value }) => new Types.ObjectId(value))
  _id: Types.ObjectId;

  @IsInstance(Types.ObjectId)
  @ApiProperty({
    type: "string",
  })
  @Transform(({ value }) => new Types.ObjectId(value))
  habitId: Types.ObjectId;

  @IsInstance(Types.ObjectId)
  @ApiProperty({
    type: "string",
  })
  @Transform(({ value }) => new Types.ObjectId(value))
  userId: Types.ObjectId;

  @IsNumber()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  date: number;
}
