import { validateNumber, validateWebsite, validateZipcode } from "../lib/validation";

export type FakerApiFieldDefinition = {
  type: string,
  fakerApiType: string,
  required?: boolean,
  validateFn?: any,
};

export const FakerApiFieldDefinitions: { [index: string]: FakerApiFieldDefinition } = {
  "company": {
    type: "text",
    fakerApiType: "company_name",
    required: true,
  },
  "country": {
    type: "text",
    fakerApiType: "country",
    required: true,
  },
  "state": {
    type: "text",
    fakerApiType: "state",
    required: true,
  },
  "city": {
    type: "text",
    fakerApiType: "city",
    required: true,
  },
  "zipcode": {
    type: "text",
    fakerApiType: "postcode",
    required: true,
    validateFn: validateZipcode,
  },
  "employees": {
    type: "number",
    fakerApiType: "counter",
    required: true,
    validateFn: validateNumber,
  },
  "revenue": {
    type: "number",
    fakerApiType: "number",
    required: true,
    validateFn: validateNumber,
  },
  "website": {
    type: "text",
    fakerApiType: "website",
    required: true,
    validateFn: validateWebsite,
  },
  "sales_rep": {
    type: "text",
    fakerApiType: "first_name",
    required: true,
  },
  "last_contacted": {
    type: "date",
    fakerApiType: "date",
    required: false,
  },
  "purchased": {
    type: "boolean",
    fakerApiType: "boolean",
    required: false,
  },
  "notes": {
    type: "textarea",
    fakerApiType: "text",
    required: false,
  },
}
