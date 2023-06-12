import { describe, it, expect } from "vitest";
import { relatedRecords } from "~/index";

relatedRecords.authToken =
  "1000.5f29dc92b010538f83c894c16baca74e.74ef25dea62de768be137ebe06e1f03d";

describe("Records", () => {
  relatedRecords.version = "v4";

  it("getRelatedRecord", async () => {
    expect(
      await relatedRecords.getRelatedRecords(
        "Accounts",
        "4949116000000347371",
        "Deals",
        { fields: "Deal_Name" }
      )
    ).toBeTypeOf("object");
  });
  // it("getRelatedRecord", async () => {
  //   expect(
  //     await relatedRecords.getRelatedRecords(
  //       "Accounts",
  //       "3746689000002463011",
  //       "Products",
  //       { fields: "Product_Name" }
  //     )
  //   ).toBeTypeOf("object");
  // });

  // it("udpateRelatedRecord", async () => {
  //   expect(
  //     await relatedRecords.linkRelatedRecords(
  //       "Accounts",
  //       "3746689000002463011",
  //       "Products",
  //       { id: "3746689000002455105" }
  //     )
  //   ).toBeTypeOf("object");
  // });

  // it("deleterelatedRecords", async () => {
  //   expect(
  //     await relatedRecords.delinkRelatedRecords(
  //       "Accounts",
  //       "3746689000002463011",
  //       "Products",
  //       "3746689000002455105"
  //     )
  //   ).toBeTypeOf("object");
  // });
});
