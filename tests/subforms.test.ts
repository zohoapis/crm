import { describe, it, expect } from "vitest";
import { subforms } from "~/index";

subforms.authToken =
  "1000.12ff459cc11bc617efe241e226863d24.e1eb76733597ebb864d92d3e7b3ef5d3";

describe("subforms", () => {
  it("getRecords", async () => {
    expect(
      await subforms.getRecords("Subform_A", { fields: "Title" })
    ).toBeTypeOf("object");
  });

  it("insertRecords", async () => {
    expect(
      await subforms.insertRecords("Contacts", {
        subformName: "Subform_A",
        data: [
          {
            Title: "12312312",
            Content: "asdasdasd",
          },
        ],
      })
    ).toBeTypeOf("object");
  });
});
