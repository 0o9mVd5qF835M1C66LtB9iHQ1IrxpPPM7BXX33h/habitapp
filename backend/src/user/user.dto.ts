import { IsEmail } from "class-validator";

export class CreateUserInput {
  @IsEmail()
  email: string;

  hashedPassword: string;
}
