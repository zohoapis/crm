import { auth } from "@zohoapis/auth";
import { env } from "process";
import { describe, it, expect } from "vitest";
import { relatedRecords } from "~/index";
import dotenv from "dotenv";
dotenv.config();

relatedRecords.authToken =
  "1000.5f29dc92b010538f83c894c16baca74e.74ef25dea62de768be137ebe06e1f03d";

console.log(process.env.ZOHOAPIS_AUTH_CLIENTID);
relatedRecords.auth = new auth({
  clientId: process.env.ZOHOAPIS_AUTH_CLIENTID as string,
  clientSecret: process.env.ZOHOAPIS_AUTH_CLIENTSECRET as string,
  refreshToken: process.env.ZOHOAPIS_AUTH_REFRESHTOKEN as string,
});

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
