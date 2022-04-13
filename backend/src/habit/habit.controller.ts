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
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { CreateHabitInput, EditHabitInput } from "./habit.dto";
import { HabitService } from "./habit.service";

@Controller("habits")
export class HabitController {
  constructor(private habitService: HabitService) {}

  // TODO Get userId from AuthGuard
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUserId(@Query("userId") userId: string) {
    return await this.habitService.findAllByUserId(userId);
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
