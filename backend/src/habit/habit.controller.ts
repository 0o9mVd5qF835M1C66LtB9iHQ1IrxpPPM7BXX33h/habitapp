import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Put,
  Param,
  Delete,
} from "@nestjs/common";

import { CreateHabitInput, EditHabitInput } from "./habit.dto";
import { HabitService } from "./habit.service";

@Controller("habits")
export class HabitController {
  constructor(private habitService: HabitService) {}

  @Get()
  async findAll(@Query("userId") userId: string) {
    return await this.habitService.findAll(userId);
  }

  @Get("/:id")
  async findById(@Param("id") id: string) {
    return await this.habitService.findById(id);
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
