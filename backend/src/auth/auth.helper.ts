import bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthHelper {
  async validatePassword(plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  }
}
