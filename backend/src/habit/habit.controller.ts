import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "src/auth/auth.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserDocument } from "src/user/user.schema";

import { CreateHabitInput, EditHabitInput } from "./habit.dto";
import { HabitService } from "./habit.service";

@Controller("habits")
export class HabitController {
  constructor(private habitService: HabitService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUserId(@CurrentUser() user: UserDocument) {
    return await this.habitService.findAllByUserId(user._id);
  }

  @Post("create")
  async createHabit(@Body() createHabitInput: CreateHabitInput) {
    return await this.habitService.createHabit(createHabitInput);
  }

  @Put("/:id/edit")
  async editHabit(@Body() editHabitInput: EditHabitInput) {
    console.log("What??");
    return await this.habitService.editHabit(editHabitInput);
  }

  @Delete("/:id")
  async deleteHabit(@Param("id") id: string) {
    return await this.habitService.deleteHabit(id);
  }
}
