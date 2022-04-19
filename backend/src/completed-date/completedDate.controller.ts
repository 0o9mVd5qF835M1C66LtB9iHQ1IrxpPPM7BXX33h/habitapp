import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import {
  CreateCompletedDateInput,
  FindAllCompletedDatesInput,
} from "./completedDate.dto";
import { CompletedDate } from "./completedDate.schema";
import { CompletedDateService } from "./completedDate.service";

@UseGuards(JwtAuthGuard)
@Controller("completed-dates")
export class CompletedDateController {
  constructor(private completedDateService: CompletedDateService) {}

  @Get()
  @ApiOkResponse({
    type: [CompletedDate],
  })
  async findAllByRange(@Query() input: FindAllCompletedDatesInput) {
    return this.completedDateService.findAllByRange(input);
  }

  @Post()
  @ApiOkResponse({
    type: CompletedDate,
  })
  async createCompletedDate(@Body() input: CreateCompletedDateInput) {
    return this.completedDateService.createCompletedDate(input);
  }

  @Delete(":id")
  @ApiParam({
    name: "id",
    type: "string",
  })
  @ApiResponse({ type: CompletedDate })
  async deleteCompletedDate(@Param("id") id: string) {
    return await this.completedDateService.deleteCompletedDate(id);
  }
}
