import { describe, it, expect } from "vitest";
import { notes } from "~/index";

notes.authToken =
  "1000.1e406e43568d507b7c0aca7a63ac5d41.4d363acc4a74a35b0bab3452a9e4e53b";

describe("Get Notes", () => {
  it("getNotes", async () => {
    expect(
      await notes.getNotes({
        fields: "Note_Title",
      })
    ).toBeTypeOf("object");
  });

  //   it("getNoteById", async () => {
  //     expect(
  //       await notes.getNotes("3746689000002455197", {
  //         fields: "Note_Title",
  //       })
  //     ).toBeTypeOf("object");
  //   });

  //   it("getNotesByRecord", async () => {
  //     expect(
  //       await notes.getNotes("Contacts", "3746689000000208014", {
  //         fields: "Note_Title",
  //       })
  //     ).toBeTypeOf("object");
  //   });
});

// describe("Create Notes", () => {
//   it("createNotes", async () => {
//     expect(
//       await notes.createNotes("Contacts", "3746689000000208014", [
//         {
//           Note_Title: "Test 2",
//           Note_Content: "API Test 2",
//         },
//       ])
//     ).toBeTypeOf("object");
//   });

// it("createNotes", async () => {
//   expect(
//     await notes.createNotes([
//       {
//         Note_Title: "Test",
//         Note_Content: "API Test",
//         Parent_Id: "3746689000000208014",
//         se_module: "Contacts",
//       },
//       {
//         Note_Title: "Test",
//         Note_Content: "API Test",
//         Parent_Id: "3746689000000208014",
//         se_module: "Contacts",
//       },
//     ])
//   ).toBeTypeOf("object");
// });
//});

describe("Update Notes", () => {
  // it("UpdateNotes", async () => {
  //   expect(
  //     await notes.UpdateNotes("3746689000002465011", {
  //       Note_Title: "Test 3",
  //       Note_Content: "API Test 3",
  //     })
  //   ).toBeTypeOf("object");
  // });
  // it("UpdateNotes", async () => {
  //   expect(
  //     await notes.UpdateNotes("Contacts", "3746689000000208014", [
  //       {
  //         id: "3746689000002455197",
  //         Note_Title: "asdasd 2",
  //         Note_Content: "API Test 2",
  //       },
  //       {
  //         id: "3746689000002465011",
  //         Note_Title: "Test 4",
  //         Note_Content: "API Test 2",
  //       },
  //     ])
  //   ).toBeTypeOf("object");
  // });
  it("UpdateNotes", async () => {
    expect(
      await notes.UpdateNotes([
        {
          id: "3746689000002459015",
          Note_Title: "Testing",
          Note_Content: "API Test",
          Parent_Id: "3746689000000208014",
          se_module: "Contacts",
        },
        {
          id: "3746689000002469022",
          Note_Title: "Testing",
          Note_Content: "API Test",
          Parent_Id: "3746689000000208014",
          se_module: "Contacts",
        },
        {
          id: "3746689000002469025",
          Note_Title: "Testing",
          Note_Content: "API Test",
          Parent_Id: "3746689000000208014",
          se_module: "Contacts",
        },
      ])
    ).toBeTypeOf("object");
  });
});
