import { describe, it, expect } from "vitest";
import { RelatedRecords } from "~/index";

RelatedRecords.authToken =
  "1000.e9ff05ca217bfe383ad604d703b35b67.456cf1c9f242e159890178f4c6425bc8";

describe("Records", () => {
  RelatedRecords.version = "v4";

  it("getRelatedRecord", async () => {
    expect(
      await RelatedRecords.getRelatedRecords(
        "Accounts",
        "3746689000002463011",
        "Products",
        { fields: "Product_Name" }
      )
    ).toBeTypeOf("object");
  });

  it("udpateRelatedRecord", async () => {
    expect(
      await RelatedRecords.linkRelatedRecords(
        "Accounts",
        "3746689000002463011",
        "Products",
        { id: "3746689000002455105" }
      )
    ).toBeTypeOf("object");
  });

  it("deleteRelatedRecords", async () => {
    expect(
      await RelatedRecords.delinkRelatedRecords(
        "Accounts",
        "3746689000002463011",
        "Products",
        "3746689000002455105"
      )
    ).toBeTypeOf("object");
  });
});
