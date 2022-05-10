import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AuthModule } from "./auth/auth.module";
import { HabitModule } from "./habit/habit.module";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from "./database/database.module";
import * as path from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "../../frontend", "build"),
      exclude: ["/api*"],
    }),
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HabitModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
