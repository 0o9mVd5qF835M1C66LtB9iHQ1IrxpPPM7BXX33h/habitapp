import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthModule } from "./auth.module";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let authController: AuthController;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    authController = await moduleRef.resolve(AuthController);
    jwtService = await moduleRef.resolve(JwtService);
  });

  describe("registering temporary user", () => {
    it("should return valid access_token", async () => {
      const result = await authController.tempRegister();
      const decodedObject = jwtService.decode(result.accessToken);
      expect(decodedObject).toMatchInlineSnapshot();
    });
  });
});
