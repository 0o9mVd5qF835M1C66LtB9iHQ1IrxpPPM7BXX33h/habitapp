import { DatabaseModule } from "./database/database.module";

beforeEach(async () => {
  await DatabaseModule.dropTestMongoDB();
});

afterAll(async () => {
  await DatabaseModule.stopTestMongoDB();
});
