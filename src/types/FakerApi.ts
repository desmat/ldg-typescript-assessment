import {
  validateNumber,
  validateWebsite,
  validateZipcode
} from "../lib/validation";

export const FAKER_API_BASE_URL = "https://fakerapi.it/api/v2/custom";
export const FAKER_API_MIN_LOOKUP_FIELDS = 5;

export type FakerApiFieldDefinition = {
  type: string,
  fakerApiType: string,
  required?: boolean,
  lookup?: boolean,
  validateFn?: any,
};

export const FakerApiFieldDefinitions: { [index: string]: FakerApiFieldDefinition } = {
  "company": {
    type: "text",
    fakerApiType: "company_name",
    required: true,
    lookup: true,
  },
  "country": {
    type: "text",
    fakerApiType: "country",
    required: true,
    lookup: true,
  },
  "state": {
    type: "text",
    fakerApiType: "state",
    required: true,
    lookup: true,
  },
  "city": {
    type: "text",
    fakerApiType: "city",
    required: true,
    lookup: true,
  },
  "zipcode": {
    type: "text",
    fakerApiType: "postcode",
    required: true,
    lookup: true,
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
    lookup: true,
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
  },
  "purchased": {
    type: "boolean",
    fakerApiType: "boolean",
  },
  "notes": {
    type: "textarea",
    fakerApiType: "text",
  },
}
