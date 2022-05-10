import * as request from "supertest";
import { Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";

import { DatabaseModule } from "../src/database/database.module";
import { UserModule } from "../src/user/user.module";
import { UserService } from "../src/user/user.service";
import { AuthController } from "../src/auth/auth.controller";
import { AuthModule } from "../src/auth/auth.module";
import { RegisterUserInput } from "../src/auth/auth.dto";

describe("Auth", () => {
  let app: INestApplication;
  let authController: AuthController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, UserModule, AuthModule],
      controllers: [AuthController],
    }).compile();

    app = moduleRef.createNestApplication();
    userService = await moduleRef.resolve(UserService);
    app.setGlobalPrefix("/api");
  });

  describe("POST /register", () => {
    it("should throw error when register dto is not correct", async () => {
      const tempUser = await userService.createTempUser();

      const invalidEmail = "notEmail";
      const invalidPassoword = "12345";

      const input: RegisterUserInput = {
        email: invalidEmail,
        password: invalidPassoword,
        tempUserId: tempUser._id,
      };

      return request(app.getHttpServer())
        .post("/api/auth/register")
        .send(input)
        .expect(400);
    });
  });
});
