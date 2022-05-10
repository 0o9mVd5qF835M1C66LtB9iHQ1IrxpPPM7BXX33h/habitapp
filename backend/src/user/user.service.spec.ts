import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../database/database.module";
import { UserModule } from "./user.module";
import { User } from "./user.schema";
import { UserService } from "./user.service";

describe("User service", () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, UserModule],
    }).compile();

    userService = await moduleRef.resolve(UserService);
  });

  it("should create user in db", async () => {
    const user = await userService.createTempUser();
  });
});
