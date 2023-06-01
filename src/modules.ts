import fetch from "node-fetch";

export module modulesModule {
  let authToken: string;
  export let auth: any;
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
    console.log(auth);
    let url = `${baseUrl}/settings/modules`;

    console.log("url:", url);
    console.log("authToken:", auth.authToken);
    const data = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Zoho-oauthtoken " + auth.authToken,
      },
    })
      .then(async (res) => {
        console.log(res.status);
        if (res.status === 401) {
          await auth.refresh();
          return getModules();
          //authToken = auth.authToken
        } else {
          return res.json();
        }
      })
      .then((data) => {
        //console.log("data", data);
        return data as Object;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return data;
  }
}
