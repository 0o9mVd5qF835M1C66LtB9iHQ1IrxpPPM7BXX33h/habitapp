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
import { CurrentUser } from "src/auth/auth.decorator";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserDocument } from "src/user/user.schema";

import { CreateHabitInput, EditHabitInput } from "./habit.dto";
import { HabitService } from "./habit.service";

@UseGuards(JwtAuthGuard)
@Controller("habits")
export class HabitController {
  constructor(private habitService: HabitService) {}

  @Get()
  async findAllByUserId(@CurrentUser() user: UserDocument) {
    return await this.habitService.findAllByUserId(user._id);
  }

  @Post("create")
  async createHabit(@Body() createHabitInput: CreateHabitInput) {
    return await this.habitService.createHabit(createHabitInput);
  }

  @Put("/:id")
  async editHabit(@Body() editHabitInput: EditHabitInput) {
    return await this.habitService.editHabit(editHabitInput);
  }

  @Delete("/:id")
  async deleteHabit(@Param("id") id: string) {
    return await this.habitService.deleteHabit(id);
  }
}
