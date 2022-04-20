import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

import {
  AuthResponse,
  GoogleAuthInput,
  LoginInput,
  RegisterUserInput,
} from "./auth.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/temp-register")
  @ApiOkResponse({
    type: AuthResponse,
  })
  async tempRegister() {
    return await this.authService.registerTempUser();
  }

  @UseGuards(JwtAuthGuard)
  @Post("/login")
  @ApiOkResponse({
    type: AuthResponse,
  })
  async login(@Body() loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/register")
  @ApiOkResponse({
    type: AuthResponse,
  })
  async register(@Body() registerUserInput: RegisterUserInput) {
    return await this.authService.register(registerUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/google")
  @ApiOkResponse({
    type: AuthResponse,
  })
  async googleAuth(@Body() googleAuthInput: GoogleAuthInput) {
    console.log(googleAuthInput);
    return await this.authService.googleAuth(googleAuthInput);
  }
}
