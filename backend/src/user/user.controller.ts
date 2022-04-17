import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

import { CurrentUser } from "../auth/auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User, UserDocument } from "./user.schema";

@Controller("user")
export class UserController {
  @Get("/current-user")
  @ApiResponse({
    type: [User],
  })
  @UseGuards(JwtAuthGuard)
  async currentUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
