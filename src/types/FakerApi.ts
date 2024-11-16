import { validateNumber, validateWebsite, validateZipcode } from "../lib/validation";

export type FakerApiFieldDefinition = {
  type: string,
  required?: boolean,
  validateFn?: any,
};

export const FakerApiFieldDefinitions: { [index: string]: FakerApiFieldDefinition } = {
  "company": {
    type: "text",
    required: true,
  },
  "country": {
    type: "text",
    required: true,
  },
  "state": {
    type: "text",
    required: true,
  },
  "city": {
    type: "text",
    required: true,
  },
  "zipcode": {
    type: "text",
    required: true,
    validateFn: validateZipcode,
  },
  "employees": {
    type: "number",
    required: true,
    validateFn: validateNumber,
  },
  "revenue": {
    type: "number",
    required: true,
    validateFn: validateNumber,
  },
  "website": {
    type: "text",
    required: true,
    validateFn: validateWebsite,
  },
  "sales_rep": {
    type: "text",
    required: true,
  },
  "last_contacted": {
    type: "date",
    required: false,
  },
  "purchased": {
    type: "boolean",
    required: false,
  },
  "notes": {
    type: "textarea",
    required: false,
  },
}
