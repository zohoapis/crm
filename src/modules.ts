import fetch from "node-fetch";

export module modulesModule {
  export let authToken: string;
  const apiDomain = "https://www.zohoapis.com";
  export let version: string = "v4";

  const baseUrl = `${apiDomain}/crm/${version}`;

  /**
   * List All Modules
   *
   * @description Lists all modules in a CRM account
   * https://www.zoho.com/crm/developer/docs/api/v4/modules-api.html
   *
   */
  export async function getModules(): Promise<Object> {
    let url = `${baseUrl}/settings/modules`;

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
