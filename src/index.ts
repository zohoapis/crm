import { modulesModule } from "./modules";
import { notesModule } from "./notes";
import { organizationModule } from "./organization";
import { recordsModule } from "./records";
import { relatedRecordsModule } from "./relatedRecords";
import { subformsModule } from "./subforms";
import { usersModule } from "./users";

export const modules = modulesModule;
export const notes = notesModule;
export const organization = organizationModule;
export const records = recordsModule;
export const relatedRecords = relatedRecordsModule;
export const subforms = subformsModule;
export const users = usersModule;

export default {
  modules,
  notes,
  organization,
  records,
  relatedRecords,
  subforms,
  users,
};
