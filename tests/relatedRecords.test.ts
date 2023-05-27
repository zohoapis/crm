import { describe, it, expect } from "vitest";
import { relatedRecords } from "~/index";

relatedRecords.authToken =
  "1000.e9ff05ca217bfe383ad604d703b35b67.456cf1c9f242e159890178f4c6425bc8";

describe("Records", () => {
  relatedRecords.version = "v4";

  it("getRelatedRecord", async () => {
    expect(
      await relatedRecords.getRelatedRecords(
        "Accounts",
        "3746689000002463011",
        "Products",
        { fields: "Product_Name" }
      )
    ).toBeTypeOf("object");
  });

  it("udpateRelatedRecord", async () => {
    expect(
      await relatedRecords.linkRelatedRecords(
        "Accounts",
        "3746689000002463011",
        "Products",
        { id: "3746689000002455105" }
      )
    ).toBeTypeOf("object");
  });

  it("deleterelatedRecords", async () => {
    expect(
      await relatedRecords.delinkRelatedRecords(
        "Accounts",
        "3746689000002463011",
        "Products",
        "3746689000002455105"
      )
    ).toBeTypeOf("object");
  });
});
