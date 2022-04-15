import { Controller, Get, UseGuards } from "@nestjs/common";

import { CurrentUser } from "../auth/auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserDocument } from "./user.schema";

@Controller("user")
export class UserController {
  @Get("/current-user")
  @UseGuards(JwtAuthGuard)
  async currentUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
