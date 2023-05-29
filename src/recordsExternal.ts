//Move this
type GetParams = {
  [key: string]: any;
  fields?: string;
  cvid?: string;
  page?: number;
  per_page?: number;
  page_token?: string;
  sort_order?: string;
  sort_by?: string;
  converted?: string;
  territory_id?: number;
  include_child?: boolean;
};

type BasicParams = {
  [key: string]: any;
  type?: string; //all, recycle, permanent
  page?: number; //Positives only
  per_page?: number; //1-200
};

import fetch from "node-fetch";

export module recordsExternalModule {
  export let authToken: string;
  const apiDomain = "https://www.zohoapis.com";
  export let version: string = "v4";

  const baseUrl = `${apiDomain}/crm/${version}`;

  /**
   * Get Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/get-records.html
   *
   * @param {String} module - Module Name
   * @param {String} recordId - Record Id
   * @param {GetParams} params - Query Parameters
   */
  export async function getRecords(
    module: String,
    recordId: String,
    externalName: String
  ): Promise<Object>;
  export async function getRecords(
    module: String,
    recordId: String,
    externalName: String,
    params: GetParams
  ): Promise<Object>;
  export async function getRecords(
    module: String,
    recordIds: String[],
    externalName: String
  ): Promise<Object>;
  export async function getRecords(
    module: String,
    recordIds: String[],
    externalName: String,
    params: GetParams
  ): Promise<Object>;
  export async function getRecords(
    module: String,
    a: String | String[],
    externalName: String,
    b?: GetParams
  ): Promise<Object> {
    let recordId: String | undefined = undefined;
    let recordIds: String[] | undefined = undefined;
    let params: GetParams | undefined = undefined;

    if (typeof a === "string") {
      recordId = a;
    } else if (Array.isArray(a)) {
      recordIds = a;
    }

    let url = `${baseUrl}/${module}${recordId ? `/${recordId}` : ""}`;

    console.log("authToken:", authToken);
    console.log("recordId:", recordId);
    console.log("params:", params);
    if (params) {
      const qs =
        "?" +
        Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params![key])}`)
          .join("&");
      url = url + qs;
    }
    if (recordIds) {
      const ids =
        `${url.includes("?") ? "&" : "?"}ids=` +
        recordIds.map((id) => id).join(",");
      url = url + ids;
    }

    console.log("url:", url);
    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
        "X-EXTERNAL": `${module}.${externalName}`,
      },
    })
      .then((res) => res.json())
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
   * Create Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/insert-records.html
   *
   * @param {String} module - Module Name
   * @param {Object|Object[]} record - Single record to create / Multiple records to create
   */
  export async function insertRecords(
    module: String,
    record: Object
  ): Promise<Object>;
  export async function insertRecords(
    module: String,
    records: Object[]
  ): Promise<Object>;
  export async function insertRecords(
    module: String,
    b: Object[] | Object
  ): Promise<Object> {
    let newRecords: Object[] | undefined = undefined;

    if (Array.isArray(b)) {
      newRecords = b;
    } else {
      newRecords = [b];
    }

    let url = `${baseUrl}/${module}`;

    console.log("url:", url);
    const data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
      body: JSON.stringify({ data: newRecords }),
    })
      .then((res) => res.json())
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
   * Updates a Record
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/update-records.html
   *
   * @param {String} module - Module Name
   * @param {String} recordId - Record Id
   * @param {Object} record - Record to update
   */
  export async function updateRecords(
    module: String,
    records: Object[]
  ): Promise<Object>;
  export async function updateRecords(
    module: String,
    recordId: String,
    record: Object
  ): Promise<Object>;
  export async function updateRecords(
    module: String,
    b: Object[] | String,
    c?: Object
  ): Promise<Object> {
    let recordId: String | undefined = undefined;
    let updateRecords: Object[] | undefined = undefined;

    if (typeof b === "string" && c) {
      recordId = b;
      updateRecords = [c];
    } else {
      updateRecords = [b];
    }

    let url = `${baseUrl}/${module}/${recordId}`;

    console.log("url:", url);
    const data = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
      body: JSON.stringify({ data: updateRecords }),
    })
      .then((res) => res.json())
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
   * Upserts a Record
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/insert-records.html
   *
   * @param {String} module - Module Name
   * @param {Object|Object[]} record - Single record to create / Multiple records to create
   */
  export async function upsertRecords(
    module: String,
    record: Object
  ): Promise<Object>;
  export async function upsertRecords(
    module: String,
    records: Object[]
  ): Promise<Object>;
  export async function upsertRecords(
    module: String,
    b: Object[] | Object
  ): Promise<Object> {
    let newRecords: Object[] | undefined = undefined;

    if (Array.isArray(b)) {
      newRecords = b;
    } else {
      newRecords = [b];
    }

    let url = `${baseUrl}/${module}/upsert`;

    console.log("url:", url);
    const data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
      body: JSON.stringify({ data: newRecords }),
    })
      .then((res) => res.json())
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
   * Delete Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/delete-records.html
   *
   * @param {String} module - Module Name
   * @param {String} recordId - Record Id
   * @param {Object} record - Record to update
   */
  export async function deleteRecords(
    module: string,
    recordId: string
  ): Promise<Object>;
  export async function deleteRecords(
    module: string,
    recordIds: string[]
  ): Promise<Object>;
  export async function deleteRecords(
    module: string,
    recordId: string | string[]
  ): Promise<Object> {
    let url = `${baseUrl}/${module}`;

    if (Array.isArray(recordId)) {
      const qs = `?ids=${recordId
        .map((id) => encodeURIComponent(id))
        .join(",")}`;
      url = url + qs;
    } else {
      url = url + `/${recordId}`;
    }

    console.log("url:", url);
    const data = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
    })
      .then((res) => res.json())
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
   * Get Deleted Records
   *
   * @description Get's a list of deleted records from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/get-deleted-records.html
   *
   * @param {String} module - Module Name
   * @param {ListDeletedParams} params - Query Parameters
   */
  export const getDeleted = async (module: string, params?: BasicParams) => {
    let url = `${baseUrl}/${module}/deleted`;
    if (params) {
      const qs =
        "?" +
        Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params![key])}`)
          .join("&");
      url = url + qs;
    }

    console.log(url);
    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
    })
      .then((res) => {
        return res.body ? res.json() : {};
      })
      .then((data) => {
        console.log(data);
        return data as Object;
      })
      .catch((err) => console.log(err));

    return data;
  };

  //Search
  export async function searchRecords(
    module: String,
    criteria: String[]
  ): Promise<Object>;
  export async function searchRecords(
    module: String,
    email: String
  ): Promise<Object>;
  export async function searchRecords(
    module: String,
    phone: String
  ): Promise<Object>;
  export async function searchRecords(
    module: String,
    word: String
  ): Promise<Object>;
  export async function searchRecords(
    module: String,
    a: String | String[]
  ): Promise<Object> {
    let url = `${baseUrl}/${module}/search`;

    //email   /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    //phone   /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g

    if (typeof a === "string") {
      if (
        a.match(
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        )
      ) {
        url = url + "?email=" + a;
      } else if (
        a.match(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g
        )
      ) {
        url = url + "?phone='" + a + "'";
      } else {
        url = url + "?word=" + a;
      }
    } else if (Array.isArray(a)) {
      const qs = `?criteria=(${a
        .map((criteria) => encodeURIComponent(criteria as string))
        .join("and")})`;
      url = url + qs;

      //url = url + "?criteria=(" + a + ")";
    } else {
      //err
    }

    console.log(url);

    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
    })
      .then((res) => res.json())
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

  //Record count
  export async function countRecords(
    module: String,
    criteria: String[]
  ): Promise<Object>;
  export async function countRecords(
    module: String,
    email: String
  ): Promise<Object>;
  export async function countRecords(
    module: String,
    phone: String
  ): Promise<Object>;
  export async function countRecords(
    module: String,
    word: String
  ): Promise<Object>;
  export async function countRecords(
    module: String,
    a: String | String[]
  ): Promise<Object> {
    let url = `${baseUrl}/${module}/actions/count`;

    if (typeof a === "string") {
      if (
        a.match(
          /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
        )
      ) {
        url = url + "?email=" + a;
      } else if (
        a.match(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g
        )
      ) {
        url = url + "?phone='" + a + "'";
      } else {
        url = url + "?word=" + a;
      }
    } else if (Array.isArray(a)) {
      const qs = `?criteria=(${a
        .map((criteria) => encodeURIComponent(criteria as string))
        .join("and")})`;
      url = url + qs;

      //url = url + "?criteria=(" + a + ")";
    } else {
      //err
    }

    console.log(url);

    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
    })
      .then((res) => res.json())
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
