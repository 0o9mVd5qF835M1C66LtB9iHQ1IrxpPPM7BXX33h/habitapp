import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type HabitDocument = Habit & Document;

@Schema()
export class Habit {
  @Prop()
  @ApiProperty()
  userId: string;

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
  @ApiProperty()
  archived: boolean;

  @Prop()
  @ApiProperty({ type: [Number] })
  currentStreakDates: number[];

  @Prop()
  @ApiProperty({ type: [Number] })
  longestStreakDates: number[];
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
