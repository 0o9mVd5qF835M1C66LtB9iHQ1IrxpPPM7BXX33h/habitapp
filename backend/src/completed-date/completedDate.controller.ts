import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";

import { CurrentUser } from "../auth/auth.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserDocument } from "../user/user.schema";
import { CreateCompletedDateInput } from "./completedDate.dto";
import { CompletedDateService } from "./completedDate.service";

@Controller("completed-dates")
export class CompletedDateController {
  constructor(private completedDateService: CompletedDateService) {}

  @Post("/create-completed-date")
  @UseGuards(JwtAuthGuard)
  async createCompletedDate(
    @Body() createdCompletedDateInput: CreateCompletedDateInput,
  ) {
    return await this.completedDateService.createCompletedDate(
      createdCompletedDateInput,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAllByDateAndUser(
    @Query("startDate") startDate: number,
    @Query("endDate") endDate: number,
    @CurrentUser() user: UserDocument,
  ) {
    return await this.completedDateService.findAllByDateAndUser(
      startDate,
      endDate,
      user._id,
    );
  }
}
