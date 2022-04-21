import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { stringify as yamlStringify } from "yaml";
import * as fs from "fs/promises";

import * as dayjs from "dayjs";
import * as isoWeek from "dayjs/plugin/isoWeek";
import * as isToday from "dayjs/plugin/isToday";
import * as isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { AppModule } from "./app.module";

dayjs.extend(isoWeek);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const documentConfig = new DocumentBuilder()
    .setTitle("Habit App")
    .setDescription("Habit App made by Oybek Alimatov")
    .setVersion("1.0.0")
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  await fs.writeFile("./open-api.yaml", yamlStringify(document));

  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
