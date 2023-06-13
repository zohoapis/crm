import { auth } from "@zohoapis/auth";
import { describe, it, expect } from "vitest";
import { records } from "~/index";
import dotenv from "dotenv";
dotenv.config();

records.authToken =
  "1000.5f29dc92b010538f83c894c16baca74e.74ef25dea62de768be137ebe06e1f03d";

console.log(process.env.ZOHOAPIS_AUTH_CLIENTID);
records.auth = new auth({
  clientId: process.env.ZOHOAPIS_AUTH_CLIENTID as string,
  clientSecret: process.env.ZOHOAPIS_AUTH_CLIENTSECRET as string,
  refreshToken: process.env.ZOHOAPIS_AUTH_REFRESHTOKEN as string,
});

describe("records", () => {
  records.version = "v2";
  // it("getRecord", async () => {
  //   console.log(`records.getRecord("Accounts")`);
  //   expect(await records.getRecord("Accounts")).toBeTypeOf("object");
  // });

  it("getRecord", async () => {
    console.log(`records.getRecord("Accounts", { fields: "Currency", })`);
    expect(await records.getRecords("Accounts", { fields: "id" })).toBeTypeOf(
      "object"
    );
  });

  // it("getRecord", async () => {
  //   console.log(`records.getRecord("Accounts", { fields: "Currency", })`);
  //   expect(await records.getRecords("Accounts", { fields: "id" })).toBeTypeOf(
  //     "object"
  //   );
  // });

  // it("getRecord by Id", async () => {
  //   console.log(
  //     `records.getRecord("Accounts", "3746689000000208148", { fields: "Currency", })`
  //   );
  //   expect(
  //     await records.getRecords("Accounts", "3746689000000208148", {
  //       fields: "Currency",
  //     })
  //   ).toBeTypeOf("object");
  // });

  // it("insertRecord", async () => {
  //   expect(
  //     await records.insertRecords("Accounts", {
  //       Account_Name: "This is a test2",
  //     })
  //   ).toBeTypeOf("object");
  // });

  // it("updateRecord", async () => {
  //   expect(
  //     await records.updateRecords("Accounts", "3746689000002451001", {
  //       Account_Name: "This is a test2",
  //     })
  //   ).toBeTypeOf("object");
  // });

  // it("deleteRecord", async () => {
  //   expect(
  //     await records.deleteRecords("Accounts", [
  //       "3746689000002461001",
  //       "3746689000002460001",
  //     ])
  //   ).toBeTypeOf("object");
  // });

  // it("search", async () => {
  //   expect(
  //     await records.searchRecords("Contacts", [
  //       "(Email:equals:doug@pecits.com)",
  //       "(Title:equals:Apple)",
  //     ])
  //   ).toBeTypeOf("object");
  //   expect(await records.searchRecords("Contacts", "Apple")).toBeTypeOf(
  //     "object"
  //   );
  // });

  // it("upsertRecord", async () => {
  //   expect(
  //     await records.upsertRecords("Accounts", {
  //       Account_Name: "This is a test2",
  //       Phone: "123-456-7890",
  //     })
  //   ).toBeTypeOf("object");
  // });

  // it("count", async () => {
  //   expect(
  //     await records.countRecords("Contacts", [
  //       "(Email:equals:doug@pecits.com)",
  //       "(Title:equals:Apple)",
  //     ])
  //   ).toBeTypeOf("object");
  //   expect(
  //     await records.countRecords("Contacts", "doug@pecits.com")
  //   ).toBeTypeOf("object");
  // });

  // it("getDeleted", async () => {
  //   expect(
  //     await records.getDeleted("Accounts", { type: "permanent" })
  //   ).toBeTypeOf("object");
  // });
});
