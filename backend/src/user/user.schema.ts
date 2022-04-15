import { BadRequestException } from "@nestjs/common";
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

const nonUniqueErrorCode = 11000;

UserSchema.post("save", (error, _, next) => {
  if (error.code === nonUniqueErrorCode) {
    next(new BadRequestException("User already exists"));
  } else {
    next(error);
  }
});
