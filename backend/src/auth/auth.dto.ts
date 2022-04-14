import { IsEmail, MinLength } from "class-validator";

export class RegisterUserInput {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

export class LoginInput {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
