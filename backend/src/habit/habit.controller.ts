import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiParam, ApiResponse } from "@nestjs/swagger";
import { CurrentUser } from "src/auth/auth.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserDocument } from "src/user/user.schema";
import { Schema } from "mongoose";

import { CreateHabitInput, EditHabitInput } from "./habit.dto";
import { Habit } from "./habit.schema";
import { HabitService } from "./habit.service";

@UseGuards(JwtAuthGuard)
@Controller("habits")
export class HabitController {
  constructor(private habitService: HabitService) {}

  @Get()
  @ApiResponse({
    type: [Habit],
  })
  async findAllByUserId(@CurrentUser() user: UserDocument) {
    return await this.habitService.findAllByUserId(user._id);
  }

  @Post("/create")
  @ApiResponse({ type: Habit })
  async createHabit(@Body() createHabitInput: CreateHabitInput) {
    return await this.habitService.createHabit(createHabitInput);
  }

  @Put("/:id")
  @ApiResponse({ type: Habit })
  async editHabit(
    @Param("id") id: Schema.Types.ObjectId,
    @Body() editHabitInput: EditHabitInput,
  ) {
    return await this.habitService.editHabit(id, editHabitInput);
  }

  @Delete()
  @ApiResponse({ type: Habit })
  async deleteHabit(@Param("id") id: string) {
    return await this.habitService.deleteHabit(id);
  }
}
