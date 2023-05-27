import { describe, it, expect } from "vitest";
import { Records } from "~/index";

Records.authToken =
  "1000.e9ff05ca217bfe383ad604d703b35b67.456cf1c9f242e159890178f4c6425bc8";

describe("Records", () => {
  Records.version = "v2";
  // it("getRecord", async () => {
  //   console.log(`Records.getRecord("Accounts")`);
  //   expect(await Records.getRecord("Accounts")).toBeTypeOf("object");
  // });

  it("getRecord", async () => {
    console.log(`Records.getRecord("Accounts", { fields: "Currency", })`);
    expect(await Records.getRecords("Accounts", { fields: "id" })).toBeTypeOf(
      "object"
    );
  });

  // it("getRecord by Id", async () => {
  //   console.log(
  //     `Records.getRecord("Accounts", "3746689000000208148", { fields: "Currency", })`
  //   );
  //   expect(
  //     await Records.getRecords("Accounts", "3746689000000208148", {
  //       fields: "Currency",
  //     })
  //   ).toBeTypeOf("object");
  // });

  // it("insertRecord", async () => {
  //   expect(
  //     await Records.insertRecords("Accounts", {
  //       Account_Name: "This is a test2",
  //     })
  //   ).toBeTypeOf("object");
  // });

  // it("updateRecord", async () => {
  //   expect(
  //     await Records.updateRecords("Accounts", "3746689000002451001", {
  //       Account_Name: "This is a test2",
  //     })
  //   ).toBeTypeOf("object");
  // });

  // it("deleteRecord", async () => {
  //   expect(
  //     await Records.deleteRecords("Accounts", [
  //       "3746689000002461001",
  //       "3746689000002460001",
  //     ])
  //   ).toBeTypeOf("object");
  // });

  // it("search", async () => {
  //   expect(
  //     await Records.searchRecords("Contacts", [
  //       "(Email:equals:doug@pecits.com)",
  //       "(Title:equals:Apple)",
  //     ])
  //   ).toBeTypeOf("object");
  //   expect(await Records.searchRecords("Contacts", "Apple")).toBeTypeOf(
  //     "object"
  //   );
  // });

  it("upsertRecord", async () => {
    expect(
      await Records.upsertRecords("Accounts", {
        Account_Name: "This is a test2",
        Phone: "123-456-7890",
      })
    ).toBeTypeOf("object");
  });

  it("count", async () => {
    expect(
      await Records.countRecords("Contacts", [
        "(Email:equals:doug@pecits.com)",
        "(Title:equals:Apple)",
      ])
    ).toBeTypeOf("object");
    expect(
      await Records.countRecords("Contacts", "doug@pecits.com")
    ).toBeTypeOf("object");
  });

  it("getDeleted", async () => {
    expect(
      await Records.getDeleted("Accounts", { type: "permanent" })
    ).toBeTypeOf("object");
  });
});
