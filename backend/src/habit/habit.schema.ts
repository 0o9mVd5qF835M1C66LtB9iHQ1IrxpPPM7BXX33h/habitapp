import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, Types } from "mongoose";

export type HabitDocument = Habit & Document;

@Schema()
export class Habit {
  @Prop()
  @ApiProperty({
    type: "string",
  })
  _id: Types.ObjectId;

  @Prop()
  @ApiProperty({
    type: "string",
  })
  userId: Types.ObjectId;

  @Prop({ trim: true })
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty({ type: [Number] })
  isoWeekdays: number[];

  @Prop()
  @ApiProperty()
  dateCreated: number;

  @Prop()
  @ApiProperty({ type: [Number] })
  completedDates: number[];

  @Prop()
  @ApiProperty()
  archived: boolean;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
