//Move this

type BasicParams = {
  [key: string]: any;
  type?: string; //all, recycle, permanent
  page?: number; //Positives only
  per_page?: number; //1-200
};

import fetch from "node-fetch";

export module usersModule {
  export let authToken: string;
  const apiDomain = "https://www.zohoapis.com";
  export let version: string = "v4";

  const baseUrl = `${apiDomain}/crm/${version}`;

  /**
   * Get User(s)
   *
   * @description Gets a user or list of users
   * https://www.zoho.com/crm/developer/docs/api/v4/get-users.html
   *
   * @param {String} userId - Record Id
   * @param {BasicParams} params - Query Parameters
   */
  export async function getUsers(params?: BasicParams): Promise<Object>;
  export async function getUsers(userId?: String): Promise<Object>;
  export async function getUsers(userIds?: String[]): Promise<Object>;
  export async function getUsers(
    params?: BasicParams,
    userId?: String
  ): Promise<Object>;
  export async function getUsers(
    params?: BasicParams,
    userIds?: String[]
  ): Promise<Object>;
  export async function getUsers(
    a?: BasicParams | String | String[],
    b?: String | String[]
  ): Promise<Object> {
    let userId: String | undefined = undefined;
    let userIds: String[] | undefined = undefined;
    let params: BasicParams | undefined = undefined;

    if (typeof a !== "undefined") {
      if (Array.isArray(a)) {
        userIds = a;
      } else if (typeof a === "string") {
        userId = a;
      } else {
        params = a;
      }
    }
    if (typeof b !== "undefined") {
      if (Array.isArray(b)) {
        userIds = b;
      } else if (typeof b === "string") {
        userId = b;
      }
    }

    let url = `${baseUrl}/users${userId ? `/${userId}` : ""}`;

    console.log("authToken:", authToken);
    console.log("userId:", userId);
    console.log("params:", params);
    if (params) {
      const qs =
        "?" +
        Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params![key])}`)
          .join("&");
      url = url + qs;
    }

    if (userIds) {
      const ids =
        `${url.includes("?") ? "&" : "?"}ids=` +
        userIds.map((id) => id).join(",");
      url = url + ids;
    }

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
}
