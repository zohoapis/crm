type BasicFieldParams = {
  [key: string]: any;
  fields: string; //all, recycle, permanent
  page?: number; //Positives only
  per_page?: number; //1-200
};

import fetch from "node-fetch";

export module relatedRecordsModule {
  export let authToken: string;
  const apiDomain = "https://www.zohoapis.com";
  export let version: string = "v4";

  const baseUrl = `${apiDomain}/crm/${version}`;

  /**
   * Get Related Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/get-related-records.html
   *
   * @param {String} module - Module Name
   * @param {String} recordId - Record Id
   * @param {Object} record - Record to update
   */
  export async function getRelatedRecords(
    module: String,
    recordId: String,
    relatedListName: String,
    params: BasicFieldParams
  ): Promise<Object> {
    let url = `${baseUrl}/${module}/${recordId}/${relatedListName}`;

    console.log("recordId:", recordId);
    console.log("params:", params);
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
   * Link Related Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/update-related-records.html
   *
   * @param {String} module - Module Name
   * @param {String} recordId - Record Id
   * @param {Object} record - Record to update
   */
  export async function linkRelatedRecords(
    module: String,
    recordId: String,
    relatedListName: String,
    record: Object
  ): Promise<Object>;
  export async function linkRelatedRecords(
    module: String,
    recordId: String,
    relatedListName: String,
    records: Object[]
  ): Promise<Object>;
  export async function linkRelatedRecords(
    module: String,
    recordId: String,
    relatedListName: String,
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
   * Delink Related Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/delink.html
   *
   * @param {String} module - Module Name
   * @param {String} recordId - Record Id
   * @param {Object} record - Record to update
   */
  export async function delinkRelatedRecords(
    module: String,
    recordId: String,
    relatedListName: String,
    relatedRecordId: String
  ): Promise<Object>;
  export async function delinkRelatedRecords(
    module: String,
    recordId: String,
    relatedListName: String,
    relatedRecordIds: String[]
  ): Promise<Object>;
  export async function delinkRelatedRecords(
    module: String,
    recordId: String,
    relatedListName: String,
    relatedRecordId: String | String[]
  ): Promise<Object> {
    let url = `${baseUrl}/${module}/${recordId}/${relatedListName}`;

    if (Array.isArray(relatedRecordId)) {
      const qs = `?ids=${relatedRecordId.map((id) => id).join(",")}`;
      url = url + qs;
    } else {
      url = url + `/${relatedRecordId}`;
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
}