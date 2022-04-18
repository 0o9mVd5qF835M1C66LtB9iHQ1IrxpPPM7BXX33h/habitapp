import { Schema } from "mongoose";
import { IsEmail, IsMongoId, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthResponse {
  @ApiProperty()
  accessToken: string;
}

export class RegisterUserInput {
  @IsMongoId()
  @ApiProperty({ type: String })
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
  @ApiProperty({ type: String })
  tempUserId: Schema.Types.ObjectId;

  @IsEmail()
  @ApiProperty()
  email: string;
}
