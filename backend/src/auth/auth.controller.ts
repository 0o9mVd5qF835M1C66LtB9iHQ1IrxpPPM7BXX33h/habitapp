import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";

import { GoogleAuthInput, LoginInput, RegisterUserInput } from "./auth.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/temp-register")
  async tempRegister() {
    return await this.authService.registerTempUser();
  }

  @UseGuards(JwtAuthGuard)
  @Post("/login")
  async login(@Body() loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/register")
  async register(@Body() registerUserInput: RegisterUserInput) {
    return await this.authService.register(registerUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/google")
  async googleAuth(@Body() googleAuthInput: GoogleAuthInput) {
    return await this.authService.googleAuth(googleAuthInput);
  }
}
