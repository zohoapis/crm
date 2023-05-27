import { describe, it, expect } from "vitest";
import { organization } from "~/index";

organization.authToken =
  "1000.bbbc2af11b4c3077800200566dc7047d.ec49810a6be43cef25d990611649f162";

describe("organization", () => {
  it("getOrganizationDetails", async () => {
    expect(await organization.getOrganizationDetails()).toBeTypeOf("object");
  });

  //Need to implement and test photo upload
});
