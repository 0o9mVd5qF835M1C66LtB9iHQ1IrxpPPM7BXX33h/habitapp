import { Test } from "@nestjs/testing";

import { DatabaseModule } from "../database/database.module";

describe("Database module", () => {
  it("should compile the module", async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    expect(moduleRef).toBeDefined();
  });
});
