import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

export type HabitDocument = Habit & Document;

@Schema()
export class Habit {
  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  isoWeekdays: number[];

  @Prop({ required: true })
  dateCreated: number;

  @Prop({ required: true })
  archived: boolean;

  @Prop({ required: true })
  currentStreakDates: number[];

  @Prop({ required: true })
  longestStreakDates: number[];
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
