import { IsEmail, MinLength } from "class-validator";

export class RegisterUserInput {
  @IsEmail()
  email: string;

  @MinLength(5)
  password: string;
}
