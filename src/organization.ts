import fetch from "node-fetch";

export module organizationModule {
  export let authToken: string;
  const apiDomain = "https://www.zohoapis.com";
  export let version: string = "v4";

  const baseUrl = `${apiDomain}/crm/${version}`;

  /**
   * Get Organization Information
   *
   * @description Gets the organization's information
   * https://www.zoho.com/crm/developer/docs/api/v4/get-org-data.html
   *
   */
  export async function getOrganizationDetails(): Promise<Object> {
    let url = `${baseUrl}/org`;

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
   * Upload Organization Photo
   *
   * @description Uploads a new organization photo
   * https://www.zoho.com/crm/developer/docs/api/v4/upload-org-img.html
   *
   * @param {file} file - Module Name
   */
  export async function linkRelatedRecords(): Promise<Object> {
    let url = `${baseUrl}/org/photo`;

    console.log("url:", url);
    const data = await fetch(url, {
      method: "POST",
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
