import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Types } from "mongoose";

export type CompletedDateDocument = CompletedDate & Document;

@Schema()
export class CompletedDate {
  @Prop()
  @ApiProperty()
  userId: Types.ObjectId;

  @Prop()
  @ApiProperty()
  habitId: Types.ObjectId;

  @ApiProperty()
  @Prop()
  date: number;
}

export const CompletedDateSchema = SchemaFactory.createForClass(CompletedDate);
