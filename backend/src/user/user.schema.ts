import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  _id: Types.ObjectId;

  @Prop({ unique: true, lowercase: true, trim: true, required: false })
  email: string;

  @Prop({ required: false })
  password?: string;

  @Prop()
  isTemp: boolean;

  @Prop()
  dateCreated: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
