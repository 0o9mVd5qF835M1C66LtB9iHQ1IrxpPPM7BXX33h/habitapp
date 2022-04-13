import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CompletedDateDocument = CompletedDate & Document;

@Schema()
export class CompletedDate {
  @Prop()
  userId: string;

  @Prop()
  habitId: string;

  @Prop()
  date: number;
}

export const CompletedDateSchema = SchemaFactory.createForClass(CompletedDate);
