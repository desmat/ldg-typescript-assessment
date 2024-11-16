
export function validateZipcode(val: string) {
  if (!val.match(/^\d{5}(\-\d{4})?$/)) {
    return "Invalid zipcode";
  }
}

export function validateWebsite(val: string) {
  if (!val.match(/^(\w+?:\/\/)?\w+(\.\w+)+$/)) {
    return "Invalid website";
  }
}

export function validateNumber(val: string) {
  if (!val.match(/^\d+\.?\d*$/)) {
    return "Invalid number";
  }
}
