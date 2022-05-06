import { Test } from "@nestjs/testing";
import { isJWT } from "class-validator";

import { DatabaseModule } from "../database/database.module";
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { AuthHelper } from "./auth.helper";
import { AuthModule } from "./auth.module";
import { AuthService } from "./auth.service";

describe("Auth service", () => {
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const modules = await Test.createTestingModule({
      imports: [AuthModule, UserModule, DatabaseModule],
    }).compile();

    userService = await modules.resolve(UserService);
    authService = await modules.resolve(AuthService);
  });

  describe("method tempRegister", () => {
    it("should create temp user in db and return access token", async () => {
      const token = "1234";
      expect(token).toBe(isJWT);
    });
  });
});
