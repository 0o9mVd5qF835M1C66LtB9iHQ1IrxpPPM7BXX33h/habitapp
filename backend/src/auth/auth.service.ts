import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { LoginInput, RegisterUserInput } from "./auth.dto";
import { UserService } from "../user/user.service";
import { AuthHelper } from "./auth.helper";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authHelper: AuthHelper,
  ) {}

  async login(loginUserInput: LoginInput) {
    const user = await this.userService.findByEmail(loginUserInput.email);

    if (!user) {
      throw new UnauthorizedException("Incorrect email or password!");
    }

    const isValidPassword = this.authHelper.validatePassword(
      loginUserInput.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException("Incorrect email or password!");
    }

    const accessToken = this.jwtService.sign(user._id, {
      expiresIn: "30 days",
    });

    return { accessToken };
  }

  async register(registerUserInput: RegisterUserInput) {
    const { password, email } = registerUserInput;
    const hashedPassword = await this.authHelper.hashPassword(password);

    const user = await this.userService.createUser({
      email,
      hashedPassword,
    });

    const accessToken = this.jwtService.sign(user._id, {
      expiresIn: "30 days",
    });

    return { accessToken };
  }

  async registerTempUser() {
    const tempUser = await this.userService.createTempUser();
    const accessToken = this.jwtService.sign(tempUser._id);
    return { accessToken };
  }
}
