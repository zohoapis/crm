type GetParams = {
  [key: string]: any;
  fields: string;
  // cvid?: string;
  // page?: number;
  // per_page?: number;
  // page_token?: string;
  // sort_order?: string;
  // sort_by?: string;
  // converted?: string;
  // territory_id?: number;
  // include_child?: boolean;
};

type CreationRecord = {
  [key: string]: any;
  subformName: string;
  data: Object[];
};

import fetch from "node-fetch";

export module subformsModule {
  export let authToken: string;
  const apiDomain = "https://www.zohoapis.com";
  export let version: string = "v4";

  const baseUrl = `${apiDomain}/crm/${version}`;

  /**
   * List Subform records
   *
   * @description Lists all records in a subform
   * https://www.zoho.com/crm/developer/docs/api/v4/subforms.html
   *
   * @param {String} subformName - Subform API Name
   * @param {GetParams} params - Parameters
   */
  export async function getRecords(
    subformName: string,
    params: GetParams
  ): Promise<Object> {
    let url = `${baseUrl}/${subformName}`;

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
   * Create Subform Record(s)
   *
   * @description Get's a record from a module
   * https://www.zoho.com/crm/developer/docs/api/v4/insert-subforms.html
   *
   * @param {String} module - Module Name
   * @param {Object|Object[]} record - Single record to create / Multiple records to create
   */
  export async function insertRecords(
    module: String,
    record: CreationRecord
  ): Promise<Object>;
  export async function insertRecords(
    module: String,
    records: CreationRecord[]
  ): Promise<Object>;
  export async function insertRecords(
    module: String,
    b: CreationRecord[] | CreationRecord
  ): Promise<Object> {
    let newRecords: CreationRecord[] | undefined = undefined;
    let rec: Object[] | undefined = undefined;

    if (Array.isArray(b)) {
      newRecords = b;
    } else {
      newRecords = [b];
    }

    // const body = Object.keys(newRecords).reduce(function (arr, key) {
    //     return arr.push + newRecords![key].data;
    // }, []);

    const body = newRecords.reduce((group, record) => {
      const { subformName } = record;
      group[subformName] = group[subformName] ?? [];
      group[subformName].push({ data: record.data });
      return group;
    }, {});

    console.log(body);

    let url = `${baseUrl}/${module}`;

    console.log("url:", url);
    console.log("newRecords:", newRecords);
    const data = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Zoho-oauthtoken " + authToken,
      },
      body: JSON.stringify({ data: [body] }),
    })
      .then(async (res) => res.json())
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
