import { buildCollection } from "@camberi/firecms";
import { Ward } from "./types";

export const wardsCollection = buildCollection<Ward>({
  name: "Wards",
  singularName: "Ward",
  path: "wards",
  icon: "Map",
  description: "Add ward contact information (not yet implemented on the website)",
  group: "Content",
  properties: {
    wardNumber: {
      name: "Ward Number",
      dataType: "number",
      validation: { required: true },
    },
    alderName: {
      name: "Alder Name",
      dataType: "string",
      validation: { required: true },
    },
    email: {
      name: "Email",
      dataType: "string",
      email: true,
      validation: { required: true },
    },
    phone: {
      name: "Phone Number",
      dataType: "string",
      validation: {
        required: true,
        matchesMessage: "Phone number must be in the format: xxx-xxx-xxxx",
        matches: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      },
    },
  },
});
