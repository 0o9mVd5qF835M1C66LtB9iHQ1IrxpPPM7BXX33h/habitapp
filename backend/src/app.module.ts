import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "./auth/auth.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HabitModule } from "./habit/habit.module";
import { UserModule } from "./user/user.module";
import { CompletedDateModule } from "./completed-date/completedDate.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    HabitModule,
    CompletedDateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
