import { JwtModule } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Test } from "@nestjs/testing";
import { isJWT } from "class-validator";
import { PassportModule } from "@nestjs/passport";

import { User, UserDocument } from "../../user/user.schema";
import { UserModule } from "../../user/user.module";
import { AuthService } from "../auth.service";
import { DatabaseModule } from "../../database/database.module";
import { AuthModule } from "../auth.module";
import { UserService } from "../../user/user.service";
import { RegisterUserInput } from "../auth.dto";

describe("Auth service", () => {
  let authService: AuthService;
  let userService: UserService;
  let userModel: Model<UserDocument>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        PassportModule,
        AuthModule,
        UserModule,
        JwtModule.registerAsync({
          useFactory: () => ({
            secret: process.env.JWT_SECRET,
          }),
        }),
      ],
    }).compile();

    authService = await moduleRef.resolve(AuthService);
    userModel = await moduleRef.resolve(getModelToken(User.name));
    userService = await moduleRef.resolve(UserService);
  });

  describe("method tempRegister", () => {
    it("should create temp user in db", async () => {
      const userCollectionBefore = await userModel.count({});
      expect(userCollectionBefore).toBe(0);

      await authService.registerTempUser();

      const userCollectionAfter = await userModel.count({});
      expect(userCollectionAfter).toBe(1);
    });

    it("should return valid access token after temp user creation", async () => {
      const data = await authService.registerTempUser();
      const isValidJWT = isJWT(data.accessToken);
      expect(isValidJWT).toBe(true);
    });
  });

  describe("method register", () => {
    it("should temp user as registered", async () => {
      const tempUser = await userService.createTempUser();

      await authService.register({
        email: "email@email.com",
        password: "123456",
        tempUserId: tempUser._id,
      });

      const tempUserAfterRegister = await userService.findById(tempUser._id);
      expect(tempUserAfterRegister.isTemp).toBe(false);
    });

    it("should return valid access token after registering", async () => {
      const tempUser = await userService.createTempUser();

      const data = await authService.register({
        email: "email@email.com",
        password: "123456",
        tempUserId: tempUser._id,
      });

      const isValidJWT = isJWT(data.accessToken);
      expect(isValidJWT).toBe(true);
    });

    it("should throw error if user already registered", async () => {
      const tempUser = await userService.createTempUser();

      const input: RegisterUserInput = {
        email: "email@email.com",
        password: "123456",
        tempUserId: tempUser._id,
      };

      await authService.register(input);
      await expect(authService.register(input)).rejects.toThrow();
    });
  });

  describe("method login", () => {
    it("should throw error when incorrect email and/or password is provided", async () => {
      const tempUser = await userService.createTempUser();

      const input: RegisterUserInput = {
        email: "email@email.com",
        password: "123456",
        tempUserId: tempUser._id,
      };

      await authService.register(input);
      await expect(
        authService.login({ email: "incorrect@email.com", password: "123456" }),
      ).rejects.toThrow();

      await expect(
        authService.login({ email: "email@email.com", password: "incorrect" }),
      ).rejects.toThrow();
    });

    it("should return valid access token after login", async () => {
      const tempUser = await userService.createTempUser();

      const data = await authService.register({
        email: "email@email.com",
        password: "123456",
        tempUserId: tempUser._id,
      });

      const isValidJWT = isJWT(data.accessToken);
      expect(isValidJWT).toBe(true);
    });
  });
});
