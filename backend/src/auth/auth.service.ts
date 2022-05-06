import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";

import { GoogleAuthInput, LoginInput, RegisterUserInput } from "./auth.dto";
import { UserService } from "../user/user.service";
import { AuthHelper } from "./auth.helper";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
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

    const accessToken = this.authHelper.signAccessToken(user._id);

    return { accessToken };
  }

  async register(registerUserInput: RegisterUserInput) {
    const { password, email, tempUserId } = registerUserInput;

    const hashedPassword = await this.authHelper.hashPassword(password);

    try {
      const user = await this.userService.setTempUserAsRegistered(tempUserId, {
        email,
        password: hashedPassword,
      });

      const accessToken = this.authHelper.signAccessToken(user._id);

      return { accessToken };
    } catch (err) {
      const isNonUniqueError = err.name === "MongoError" && err.code === 11000;

      if (isNonUniqueError) {
        throw new BadRequestException("User already exists");
      }

      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async registerTempUser() {
    const tempUser = await this.userService.createTempUser();
    const accessToken = this.authHelper.signAccessToken(tempUser._id, false);
    return { accessToken };
  }

  async googleAuth(googleAuthInput: GoogleAuthInput) {
    const { email } = googleAuthInput;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return await this.googleRegister(googleAuthInput);
    }

    return await this.googleLogin(email);
  }

  async googleLogin(email: string) {
    const user = await this.userService.findByEmail(email);

    if (user.password) {
      throw new BadRequestException("Email and password was used to register.");
    }

    const accessToken = this.authHelper.signAccessToken(user._id);
    return { accessToken };
  }

  async googleRegister(googleAuthInput: GoogleAuthInput) {
    const { email, tempUserId } = googleAuthInput;

    const user = await this.userService.setTempUserAsRegistered(tempUserId, {
      email,
    });

    const accessToken = this.authHelper.signAccessToken(user._id);

    return { accessToken };
  }
}
