import { Body, Controller, Post } from "@nestjs/common";

import { LoginInput, RegisterUserInput } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/login")
  async login(@Body() loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @Post("/temp-register")
  async tempRegister() {
    return await this.authService.registerTempUser();
  }

  @Post("/register")
  async register(@Body() registerUserInput: RegisterUserInput) {
    console.log(process.env.JWT_SECRET);
    return await this.authService.register(registerUserInput);
  }
}
