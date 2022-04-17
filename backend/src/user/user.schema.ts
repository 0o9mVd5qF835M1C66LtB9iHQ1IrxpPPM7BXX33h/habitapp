import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
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
  @ApiProperty()
  email: string;

  @Prop({ required: false })
  @ApiProperty()
  password?: string;

  @ApiProperty()
  @Prop()
  isTemp: boolean;

  @ApiProperty()
  @Prop()
  dateCreated: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
