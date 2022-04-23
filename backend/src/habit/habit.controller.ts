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
import { ApiOkResponse, ApiParam, ApiResponse } from "@nestjs/swagger";
import { Types } from "mongoose";

import { CurrentUser } from "../auth/auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserDocument } from "../user/user.schema";
import {
  CreateHabitInput,
  EditHabitInput,
  UpdateHabitCompletedDatesInput,
} from "./habit.dto";
import { Habit } from "./habit.schema";
import { HabitService } from "./habit.service";

@UseGuards(JwtAuthGuard)
@Controller("habits")
export class HabitController {
  constructor(private habitService: HabitService) {}

  @Get("/:id")
  @ApiOkResponse({
    type: Habit,
  })
  @ApiParam({
    name: "id",
    type: "string",
  })
  async findById(@Param("id") id: string) {
    return await this.habitService.findById(new Types.ObjectId(id));
  }

  @Get()
  @ApiOkResponse({
    type: [Habit],
  })
  async findAllByUserId(@CurrentUser() user: UserDocument) {
    return await this.habitService.findAllByUserId(user._id);
  }

  @Post()
  @ApiOkResponse({ type: Habit })
  async createHabit(@Body() input: CreateHabitInput) {
    return await this.habitService.createHabit(input);
  }

  @Post("/update-completed-date")
  @ApiOkResponse({ type: Habit })
  async updateHabitCompletedDates(
    @Body() input: UpdateHabitCompletedDatesInput,
  ) {
    return await this.habitService.updateHabitCompletedDates(input);
  }

  @Put(":id")
  @ApiParam({
    name: "id",
    type: "string",
  })
  @ApiOkResponse({ type: Habit })
  async editHabit(
    @Param("id")
    id: string,
    @Body() editHabitInput: EditHabitInput,
  ) {
    return await this.habitService.editHabit(
      new Types.ObjectId(id),
      editHabitInput,
    );
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    type: "string",
  })
  @ApiResponse({ type: Habit })
  async deleteHabit(@Param("id") id: string) {
    return await this.habitService.deleteHabit(new Types.ObjectId(id));
  }
}
