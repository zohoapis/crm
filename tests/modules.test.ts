import { describe, it, expect } from "vitest";
import { modules, auth } from "~/index";

modules.auth = new auth({
  clientId: "1000.80QRZCEGKRP0XWRLRZMP39FFPSLI8L",
  clientSecret: "568d6769bcf967c6b23c9d38e031081a047139dd15",
  refreshToken:
    "1000.33c143c766d3fc664fc06aa9cef70895.aa3fb9e0f171a2283db0d032cdb20846",
});

// modules.authToken =
//   "1000.bbbc2af11b4c3077800200566dc7047d.ec49810a6be43cef25d990611649f162";

describe("modules", () => {
  it("getModules", async () => {
    expect(await modules.getModules()).toBeTypeOf("object");
  });

  it("getModules", async () => {
    expect(await modules.getModules()).toBeTypeOf("object");
  });
});
