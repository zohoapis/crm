import fetch from "node-fetch";
import { modulesModule } from "./modules";
import { notesModule } from "./notes";
import { organizationModule } from "./organization";
import { recordsModule } from "./records";
import { relatedRecordsModule } from "./relatedRecords";
import { usersModule } from "./users";

export const modules = modulesModule;
export const notes = notesModule;
export const organization = organizationModule;
export const records = recordsModule;
export const relatedRecords = relatedRecordsModule;
export const users = usersModule;

export default {
  modules,
  notes,
  organization,
  records,
  relatedRecords,
  users,
};

type AuthInitType = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};
export class auth {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  authToken: string = "";
  constructor(params: AuthInitType) {
    this.clientId = params.clientId;
    this.clientSecret = params.clientSecret;
    this.refreshToken = params.refreshToken;
  }

  async refresh() {
    const data = await fetch(
      `https://accounts.zoho.com/oauth/v2/token?refresh_token=${this.refreshToken}&client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=refresh_token`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        //console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return data as Object;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
    this.authToken = data.access_token;
  }
}
