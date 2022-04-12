import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateHabitInput, EditHabitInput } from "./habit.dto";

import { HabitService } from "./habit.service";

@Controller("habits")
export class HabitController {
  constructor(private habitService: HabitService) {}

  @Get("habits")
  async findAll(@Query("userId") userId: string) {
    return await this.habitService.findAll(userId);
  }

  @Post("/create")
  async createHabit(@Body() createHabitInput: CreateHabitInput) {
    return await this.habitService.createHabit(createHabitInput);
  }

  @Post("/edit")
  async editHabit(@Body() editHabitInput: EditHabitInput) {
    return await this.habitService.editHabit(editHabitInput);
  }
}
