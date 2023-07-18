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

export module recordsModule {
  export let authToken: string;
  export let auth: any;
  export let apiDomain = "https://www.zohoapis.com";
  export let version: string = "v4";

  const baseUrl = `${apiDomain}/crm/${version}`;

  /**
   * Get Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/get-records.html
   *
   * @param {string} module - Module Name
   * @param {string} recordId - Record Id
   * @param {GetParams} params - Query Parameters
   */
  //export async function getRecords(module: string): Promise<Object>;
  export async function getRecords(
    module: string,
    recordId: string
  ): Promise<Object>;
  export async function getRecords(
    module: string,
    params: GetParams
  ): Promise<Object>;
  export async function getRecords(
    module: string,
    recordId: string,
    params: GetParams
  ): Promise<Object>;
  export async function getRecords(
    module: string,
    b: string | GetParams,
    c?: GetParams
  ): Promise<Object> {
    let recordId: string | undefined = undefined;
    let params: GetParams | undefined = undefined;

    if (typeof b === "string") {
      recordId = b;
      if (typeof c !== "string") {
        params = c;
      }
    } else {
      params = b as GetParams;
    }

    let url = `${baseUrl}/${module}${recordId ? `/${recordId}` : ""}`;

    //console.log("authToken:", authToken);
    //console.log("recordId:", recordId);
    //console.log("params:", params);
    if (params) {
      const qs =
        "?" +
        Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params![key])}`)
          .join("&");
      url = url + qs;
    }

    //console.log("url:", url);
    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + (auth ? auth.authToken : authToken),
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          await auth.refresh();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return getRecords(module, b, c);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        //console.log(data);
        return data as Object;
      })
      .catch((err) => {
        //console.log(err);
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
   * @param {string} module - Module Name
   * @param {Object|Object[]} record - Single record to create / Multiple records to create
   */
  export async function insertRecords(
    module: string,
    record: Object
  ): Promise<Object>;
  export async function insertRecords(
    module: string,
    records: Object[]
  ): Promise<Object>;
  export async function insertRecords(
    module: string,
    b: Object[] | Object
  ): Promise<Object> {
    let newRecords: Object[] | undefined = undefined;

    if (Array.isArray(b)) {
      newRecords = b;
    } else {
      newRecords = [b];
    }

    let url = `${baseUrl}/${module}`;

    //console.log("url:", url);
    const data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Zoho-oauthtoken " + (auth ? auth.authToken : authToken),
      },
      body: JSON.stringify({ data: newRecords }),
    })
      .then(async (res) => {
        if (res.status === 401) {
          await auth.refresh();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return insertRecords(module, b);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        //console.log(data);
        return data as Object;
      })
      .catch((err) => {
        //console.log(err);
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
   * @param {string} module - Module Name
   * @param {string} recordId - Record Id
   * @param {Object} record - Record to update
   */
  export async function updateRecords(
    module: string,
    records: Object[]
  ): Promise<Object>;
  export async function updateRecords(
    module: string,
    recordId: string,
    record: Object
  ): Promise<Object>;
  export async function updateRecords(
    module: string,
    b: Object[] | string,
    c?: Object
  ): Promise<Object> {
    let recordId: string | undefined = undefined;
    let updateRecords: Object[] | undefined = undefined;

    if (typeof b === "string" && c) {
      recordId = b;
      updateRecords = [c];
    } else {
      updateRecords = [b];
    }

    let url = `${baseUrl}/${module}/${recordId}`;

    //console.log("url:", url);
    const data = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: "Zoho-oauthtoken " + (auth ? auth.authToken : authToken),
      },
      body: JSON.stringify({ data: updateRecords }),
    })
      .then(async (res) => {
        if (res.status === 401) {
          await auth.refresh();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return updateRecords(module, b, c);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        //console.log(data);
        return data as Object;
      })
      .catch((err) => {
        //console.log(err);
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
   * @param {string} module - Module Name
   * @param {Object|Object[]} record - Single record to create / Multiple records to create
   */
  export async function upsertRecords(
    module: string,
    record: Object
  ): Promise<Object>;
  export async function upsertRecords(
    module: string,
    records: Object[]
  ): Promise<Object>;
  export async function upsertRecords(
    module: string,
    b: Object[] | Object
  ): Promise<Object> {
    let newRecords: Object[] | undefined = undefined;

    if (Array.isArray(b)) {
      newRecords = b;
    } else {
      newRecords = [b];
    }

    let url = `${baseUrl}/${module}/upsert`;

    //console.log("url:", url);
    const data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Zoho-oauthtoken " + (auth ? auth.authToken : authToken),
      },
      body: JSON.stringify({ data: newRecords }),
    })
      .then(async (res) => {
        if (res.status === 401) {
          await auth.refresh();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return upsertRecords(module, b);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        //console.log(data);
        return data as Object;
      })
      .catch((err) => {
        //console.log(err);
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
   * @param {string} module - Module Name
   * @param {string} recordId - Record Id
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

    //console.log("url:", url);
    const data = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Zoho-oauthtoken " + (auth ? auth.authToken : authToken),
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          await auth.refresh();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return deleteRecords(module, recordId);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        //console.log(data);
        return data as Object;
      })
      .catch((err) => {
        //console.log(err);
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
   * @param {string} module - Module Name
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

    //console.log(url);
    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + (auth ? auth.authToken : authToken),
      },
    })
      .then(async (res) => {
        if (res.status === 401) {
          await auth.refresh();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return deleteRecords(module, params);
        } else {
          return res.body ? res.json() : {};
        }
      })
      .then((data) => {
        //console.log(data);
        return data as Object;
      })
      .catch((err) => {
        //console.log(err);
        return err;
      });

    return data;
  };

  /**
   * Search Records
   *
   * @description Get's a list of deleted records from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/search-records.html
   *
   * The supported criteria operators are equals, starts_with, in, not_equal, greater_equal, greater_than, less_equal, less_than and between.
   *
   * @param {string} module - Module Name
   * @param {string[]} params - Criteria to search on ["(fieldApiName:equals/starts_with:value)"]
   * @param {string} operator - Join operator: and/or
   */
  export async function searchRecords(
    module: string,
    criteria: string[],
    operator: string
  ): Promise<Object>;
  export async function searchRecords(
    module: string,
    email: string
  ): Promise<Object>;
  export async function searchRecords(
    module: string,
    phone: string
  ): Promise<Object>;
  export async function searchRecords(
    module: string,
    word: string
  ): Promise<Object>;
  export async function searchRecords(
    module: string,
    a: string | string[],
    operator?: string
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
        .join(operator)})`;
      url = url + qs;

      //url = url + "?criteria=(" + a + ")";
    } else {
      //err
    }

    //console.log(url);

    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + (auth ? auth.authToken : authToken),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
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
    module: string,
    criteria: string[]
  ): Promise<Object>;
  export async function countRecords(
    module: string,
    email: string
  ): Promise<Object>;
  export async function countRecords(
    module: string,
    phone: string
  ): Promise<Object>;
  export async function countRecords(
    module: string,
    word: string
  ): Promise<Object>;
  export async function countRecords(
    module: string,
    a: string | string[]
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

    //console.log(url);

    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + (auth ? auth.authToken : authToken),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        return data as Object;
      })
      .catch((err) => {
        //console.log(err);
        return err;
      });
    return data;
  }
}
