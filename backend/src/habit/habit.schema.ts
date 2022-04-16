import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type HabitDocument = Habit & Document;

@Schema()
export class Habit {
  @Prop()
  userId: string;

  @Prop({ trim: true })
  title: string;

  @Prop()
  isoWeekdays: number[];

  @Prop()
  dateCreated: number;

  @Prop()
  archived: boolean;

  @Prop()
  currentStreakDates: number[];

  @Prop()
  longestStreakDates: number[];
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
