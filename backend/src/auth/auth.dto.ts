import { Schema } from "mongoose";
import { IsEmail, IsMongoId, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterUserInput {
  @IsMongoId()
  @ApiProperty()
  tempUserId: Schema.Types.ObjectId;

  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(6)
  @ApiProperty()
  password: string;
}

export class LoginInput {
  @ApiProperty()
  @IsEmail()
  email: string;

  @MinLength(6)
  @ApiProperty()
  password: string;
}

export class GoogleAuthInput {
  @IsMongoId()
  @ApiProperty()
  tempUserId: Schema.Types.ObjectId;

  @IsEmail()
  @ApiProperty()
  email: string;
}
