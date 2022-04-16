import { Types } from "mongoose";
import { IsEmail, IsMongoId, MinLength } from "class-validator";

export class RegisterUserInput {
  @IsMongoId()
  tempUserId?: Types.ObjectId;

  @IsEmail()
  email: string;

  @MinLength(6)
  password?: string;
}

export class LoginInput {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
