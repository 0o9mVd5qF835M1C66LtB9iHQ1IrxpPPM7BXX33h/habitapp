import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    lowercase: true,
    trim: true,
    required: false,
    index: {
      unique: true,
      partialFilterExpression: {
        email: { $type: "string" },
      },
    },
  })
  email: string;

  @Prop({ required: false })
  password?: string;

  @Prop()
  isTemp: boolean;

  @Prop()
  dateCreated: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
