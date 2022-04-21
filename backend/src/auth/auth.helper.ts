import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthHelper {
  constructor(private jwtService: JwtService) {}

  async validatePassword(plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salt);
  }

  signAccessToken(payload: string, shouldExpire = true) {
    return this.jwtService.sign(
      { userId: payload },
      shouldExpire
        ? {
            expiresIn: "30 days",
          }
        : {},
    );
  }
}
