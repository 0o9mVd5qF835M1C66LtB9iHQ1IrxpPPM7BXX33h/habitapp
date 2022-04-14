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

  @Post("/tempRegister")
  async tempRegister() {
    return await this.authService.registerTempUser();
  }

  @Post("/register")
  async register(@Body() registerUserInput: RegisterUserInput) {
    return await this.authService.register(registerUserInput);
  }
}
