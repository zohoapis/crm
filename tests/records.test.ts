import { describe, it, expect } from "vitest";
import { records } from "~/index";

records.authToken =
  "10033322137.45d30b0271c8a91b0ea397523e8ebb18.ac6d2afaa86ad126531f9e90a9527766";
records.apiDomain = "https://afbcrm.zohoplatform.com";

describe("records", () => {
  //records.version = "v2";
  it("temp override", () => {
    expect("").toBeTypeOf("string");
  });
  it("getRecord", async () => {
    const call = await records.getRecords("Accounts", { fields: "id" });
    console.log(call)
    expect(call).toBeTypeOf("object");
  });

  // it("getRecord", async () => {
  //   console.log(`records.getRecord("Accounts", { fields: "Currency", })`);
  //   expect(await records.getRecords("Accounts", { fields: "id" })).toBeTypeOf(
  //     "object"
  //   );
  // });

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
