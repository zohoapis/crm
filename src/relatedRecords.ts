type BasicFieldParams = {
  [key: string]: any;
  fields: string; //all, recycle, permanent
  page?: number; //Positives only
  per_page?: number; //1-200
};

import fetch from "node-fetch";

export module relatedRecordsModule {
  export let authToken: string;
  export let auth: any;
  const apiDomain = "https://www.zohoapis.com";
  export let version: string = "v4";

  const baseUrl = `${apiDomain}/crm/${version}`;

  /**
   * Get Related Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/get-related-records.html
   *
   * @param {string} module - Module Name
   * @param {string} recordId - Record Id
   * @param {Object} record - Record to update
   */
  export async function getRelatedRecords(
    module: string,
    recordId: string,
    relatedListName: string,
    params: BasicFieldParams
  ): Promise<Object> {
    let url = `${baseUrl}/${module}/${recordId}/${relatedListName}`;

    // console.log("recordId:", recordId);
    // console.log("params:", params);
    const qs =
      "?" +
      Object.keys(params)
        .map((key) => `${key}=${encodeURIComponent(params![key])}`)
        .join("&");
    url = url + qs;

    // console.log("url:", url);
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
          return getRelatedRecords(module, recordId, relatedListName, params);
        } else {
          if (res.status == 204) {
            return [];
          }
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
   * Link Related Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/update-related-records.html
   *
   * @param {string} module - Module Name
   * @param {string} recordId - Record Id
   * @param {Object} record - Record to update
   */
  export async function linkRelatedRecords(
    module: string,
    recordId: string,
    relatedListName: string,
    record: Object
  ): Promise<Object>;
  export async function linkRelatedRecords(
    module: string,
    recordId: string,
    relatedListName: string,
    records: Object[]
  ): Promise<Object>;
  export async function linkRelatedRecords(
    module: string,
    recordId: string,
    relatedListName: string,
    record: Object | Object[]
  ): Promise<Object> {
    let newRecords: Object[] | undefined = undefined;

    if (Array.isArray(record)) {
      newRecords = record;
    } else {
      newRecords = [record];
    }

    let url = `${baseUrl}/${module}/${recordId}/${relatedListName}`;

    console.log("recordId:", recordId);
    console.log("url:", url);
    console.log("record", newRecords);
    const data = await fetch(url, {
      method: "PUT",
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
          return linkRelatedRecords(module, recordId, relatedListName, params);
        } else {
          return res.json();
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
   * Delink Related Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/delink.html
   *
   * @param {string} module - Module Name
   * @param {string} recordId - Record Id
   * @param {Object} record - Record to update
   */
  export async function delinkRelatedRecords(
    module: string,
    recordId: string,
    relatedListName: string,
    relatedRecordId: string
  ): Promise<Object>;
  export async function delinkRelatedRecords(
    module: string,
    recordId: string,
    relatedListName: string,
    relatedRecordIds: string[]
  ): Promise<Object>;
  export async function delinkRelatedRecords(
    module: string,
    recordId: string,
    relatedListName: string,
    b: string | string[]
  ): Promise<Object> {
    let url = `${baseUrl}/${module}/${recordId}/${relatedListName}`;

    if (Array.isArray(b)) {
      const qs = `?ids=${b.map((id) => id).join(",")}`;
      url = url + qs;
    } else {
      url = url + `/${b}`;
    }

    console.log("url:", url);
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
          return delinkRelatedRecords(module, recordId, relatedListName, b);
        } else {
          return res.json();
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
