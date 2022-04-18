import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { CompletedDateController } from "./completedDate.controller";
import { CompletedDate, CompletedDateSchema } from "./completedDate.schema";
import { CompletedDateService } from "./completedDate.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CompletedDate.name,
        schema: CompletedDateSchema,
      },
    ]),
  ],
  controllers: [CompletedDateController],
  providers: [CompletedDateService],
  exports: [],
})
export class CompletedDateModule {}
