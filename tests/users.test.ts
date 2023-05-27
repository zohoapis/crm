import { describe, it, expect } from "vitest";
import { users } from "~/index";

users.authToken =
  "1000.bbbc2af11b4c3077800200566dc7047d.ec49810a6be43cef25d990611649f162";

describe("users", () => {
  it("getUsers", async () => {
    expect(
      await users.getUsers({ per_page: 1 }, "3746689000000197013")
    ).toBeTypeOf("object");
  });
});
