import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../../database/database.module";
import { AuthController } from "../auth.controller";
import { AuthModule } from "../auth.module";
import { AuthService } from "../auth.service";

describe("Auth module", () => {
  it("should compile the module", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule, AuthModule],
    }).compile();

    expect(moduleRef).toBeDefined();
    expect(moduleRef.get(AuthController)).toBeInstanceOf(AuthController);
    expect(moduleRef.get(AuthService)).toBeInstanceOf(AuthService);
  });
});
