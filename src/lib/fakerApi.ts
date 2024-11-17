import hash from 'object-hash';
import { FAKER_API_MIN_LOOKUP_FIELDS, FakerApiFieldDefinitions } from "../types/FakerApi";

export function addLookup(id: string, entry: any, lookups: any) {
  console.log("lib.fakerApi.addLookup", { id, entry, lookups });
  Object.entries(entry)
    .forEach(([key, val]: [string, any]) => {
      if (typeof (val) != "undefined" && FakerApiFieldDefinitions[key]?.lookup) {
        let lookup = lookups[key] || {};
        let ids = lookup[val] || [];
        ids.push(id);
        lookup[val] = ids;
        lookups[key] = lookup;

        console.log("lib.fakerApi.addLookup", { id, ids, lookup, lookups });
      }
    });
};

export function buildIndexAndLookups(data: any) {
  const indexedData: { [index: string]: any[] } = {};
  const lookups: { [index: string]: any } = {};

  data.forEach((entry: any[]) => {
    const id = hash(entry);
    indexedData[id] = entry;
    addLookup(id, entry, lookups);
  });

  return { indexedData, lookups }
}

export function lookupEntryId (entry: any, lookups: any) {
  const previousEntryIds = Object.entries(FakerApiFieldDefinitions)
    .map(([key, def]) => {
      if (typeof (entry[key]) != "undefined" && def?.lookup) {
        console.log("lib.fakerApi.add", { key, lookups_key: lookups[key], entry_key: entry[key], lookups_entry: lookups[key][entry[key]] });
        return lookups[key][entry[key]]
      }
      return undefined;
    })
    .filter(Boolean);

  let matchingId;

  if (previousEntryIds.length >= FAKER_API_MIN_LOOKUP_FIELDS) {
    const matchingIds = previousEntryIds.reduce(
      (accumulator, currentValue: string[]) => accumulator
        ? accumulator.intersection(new Set(currentValue))
        : new Set(currentValue),
      undefined);
    console.log("lib.fakerApi.add", { matchingIds });

    // if we matched field value in enough field value lookups ( FAKER_API_MIN_LOOKUP_FIELDS)
    // and intersection across all returned exactly 1 then we have a matching entry id

    if (matchingIds && matchingIds.size === 1) {
      matchingId = Array.from(matchingIds)[0] as string;
    }

    console.log("lib.fakerApi.add", { matchingId });
  }

  return matchingId;
}
