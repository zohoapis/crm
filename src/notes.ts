type BasicParams = {
  [key: string]: any;
  fields: string; //all, recycle, permanent
  page?: number; //Positives only
  per_page?: number; //1-200
};

type NoteCreation = {
  Note_Title: string;
  Note_Content: string;
  Parent_Id: string;
  se_module: string;
};

type RecordNoteCreation = {
  Note_Title: string;
  Note_Content: string;
};

type NoteUpdate = {
  id: string;
  Note_Title?: string;
  Note_Content?: string;
  Parent_Id: string;
  se_module: string;
};
type RecordNoteUpdate = {
  Note_Title?: string;
  Note_Content?: string;
};
type RecordNotesUpdate = {
  id: string;
  Note_Title?: string;
  Note_Content?: string;
};

import fetch from "node-fetch";

export module notesModule {
  export let authToken: string;
  export let apiDomain = "https://www.zohoapis.com";
  export let version: string = "v4";

  const baseUrl = () => {
    return `${apiDomain}/crm/${version}`
  }

  /**
   * Get Notes
   *
   * @description Gets notes
   * https://www.zoho.com/crm/developer/docs/api/v4/get-notes.html
   *
   * @param {String} module - Module Name
   * @param {String} recordId - Record Id
   * @param {GetParams} params - Query Parameters
   */
  export async function getNotes(params: BasicParams): Promise<Object>;
  export async function getNotes(
    noteId: string,
    params: BasicParams
  ): Promise<Object>;
  export async function getNotes(
    module: string,
    recordId: string,
    params: BasicParams
  ): Promise<Object>;
  export async function getNotes(
    a?: string | BasicParams,
    b?: string | BasicParams,
    c?: BasicParams
  ): Promise<Object> {
    let url = `${baseUrl()}`;
    let params: BasicParams;

    if (c) {
      url += `/${a}/${b}/Notes`;
      params = c as BasicParams;
    } else if (b) {
      url += `/Notes/${a}`;
      params = b as BasicParams;
    } else {
      url += "/Notes";
      params = a as BasicParams;
    }

    const qs =
      "?" +
      Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params![key])}`)
        .join("&");
    url = url + qs;

    console.log("url:", url);
    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status !== 204) {
          return res.json();
        } else {
          return {};
        }
      })
      .then((data) => {
        console.log(data);
        return data as Object;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return data;
  }

  /**
   * Create a Note
   *
   * @description Creates a new note
   * https://www.zoho.com/crm/developer/docs/api/v4/create-notes.html
   *
   * @param {String} module - Module Name
   * @param {String} recordId - Record Id
   * @param {GetParams} params - Query Parameters
   */
  export async function createNotes(notes: NoteCreation[]): Promise<Object>;
  export async function createNotes(
    module: string,
    recordId: string,
    note: RecordNoteCreation[]
  ): Promise<Object>;
  export async function createNotes(
    a: NoteCreation[] | string,
    b?: string,
    c?: RecordNoteCreation[]
  ): Promise<Object> {
    let url = `${baseUrl()}`;
    let notes: NoteCreation[] | RecordNoteCreation[];

    if (typeof a === "string") {
      url += `/${a}/${b}/Notes`;
      notes = c as RecordNoteCreation[];
    } else {
      url += "/Notes";
      notes = a as NoteCreation[];
    }

    console.log("url:", url);
    const data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
      body: JSON.stringify({
        data: notes,
      }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status !== 204) {
          return res.json();
        } else {
          return {};
        }
      })
      .then((data) => {
        console.log(data);
        return data as Object;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return data;
  }

  /**
   * Updates a Note
   *
   * @description Updates a note
   * https://www.zoho.com/crm/developer/docs/api/v4/update-notes.html
   *
   * @param {String} module - Module Name
   * @param {String} recordId - Record Id
   * @param {GetParams} params - Query Parameters
   */
  export async function updateNotes(notes: NoteUpdate[]): Promise<Object>;
  export async function updateNotes(
    noteId: string,
    note: RecordNoteUpdate
  ): Promise<Object>;
  export async function updateNotes(
    module: string,
    recordId: string,
    note: RecordNotesUpdate[]
  ): Promise<Object>;
  export async function updateNotes(
    a: NoteUpdate[] | string,
    b?: string | RecordNoteUpdate,
    c?: RecordNoteUpdate[] | RecordNotesUpdate[]
  ): Promise<Object> {
    let url = `${baseUrl()}`;
    let notes: RecordNoteUpdate[] | RecordNotesUpdate[];

    if (c) {
      url += `/${a}/${b}/Notes`;
      notes = c as RecordNotesUpdate[];
    } else if (b) {
      url += `/Notes/${a}`;
      notes = [b] as RecordNoteUpdate[];
    } else {
      url += "/Notes";
      notes = a as NoteUpdate[];
    }

    console.log("url:", url);
    const data = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
      body: JSON.stringify({
        data: notes,
      }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status !== 204) {
          return res.json();
        } else {
          return {};
        }
      })
      .then((data) => {
        console.log(data);
        return data as Object;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return data;
  }

  export async function deleteNotes(noteId: string): Promise<Object>;
  export async function deleteNotes(noteIds: string[]): Promise<Object>;
  export async function deleteNotes(
    module: string,
    recordId: string,
    noteId: string
  ): Promise<Object>;
  export async function deleteNotes(
    a: string | string[],
    b?: string,
    c?: string
  ): Promise<Object> {
    let url = `${baseUrl()}`;

    if (b) {
      url += `/${a}/${b}/Notes/${c}`;
    } else if (Array.isArray(a)) {
      const qs = `?ids=${a.map((id) => id).join(",")}`;
      url += `/Notes` + qs;
    } else {
      url += `/Notes/${a}`;
    }

    console.log("url:", url);
    const data = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
    })
      .then((res) => {
        console.log(res.status);
        if (res.status !== 204) {
          return res.json();
        } else {
          return {};
        }
      })
      .then((data) => {
        console.log(data);
        return data as Object;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return data;
  }
}
