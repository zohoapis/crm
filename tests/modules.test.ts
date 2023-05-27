import { describe, it, expect } from "vitest";
import { modules } from "~/index";

modules.authToken =
  "1000.bbbc2af11b4c3077800200566dc7047d.ec49810a6be43cef25d990611649f162";

describe("modules", () => {
  it("getModules", async () => {
    expect(await modules.getModules()).toBeTypeOf("object");
  });
});
