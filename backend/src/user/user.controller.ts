import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";

import { CurrentUser } from "../auth/auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { User, UserDocument } from "./user.schema";

@Controller("user")
export class UserController {
  @Get("/current-user")
  @ApiOkResponse({
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  async currentUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
