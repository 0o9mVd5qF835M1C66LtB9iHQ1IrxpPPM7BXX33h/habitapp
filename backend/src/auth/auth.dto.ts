import { Types } from "mongoose";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class AuthResponse {
  @ApiProperty()
  accessToken: string;
}

export class RegisterUserInput {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Transform(({ value }) => new Types.ObjectId(value))
  tempUserId: Types.ObjectId;

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
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Transform(({ value }) => new Types.ObjectId(value))
  tempUserId: Types.ObjectId;

  @IsEmail()
  @ApiProperty()
  email: string;
}
