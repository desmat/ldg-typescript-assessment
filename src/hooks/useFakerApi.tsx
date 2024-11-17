import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import hash from 'object-hash';
import { buildIndexAndLookups, lookupEntryId } from "../lib/fakerApi";
import { FAKER_API_BASE_URL, FakerApiFieldDefinitions } from '../types/FakerApi';

const fakerApiQueryKey = ["fakeapi", "data"];
const fakerApiLocalstorageKey = "fakeapi:data";
const fakerApiDefaultQuantity = 10;
const fakerApiUrl = (quantity?: number) => {
  const fields = Object.entries(FakerApiFieldDefinitions)
    .map(([k, v]) => [k, v.fakerApiType].join("="))
    .join("&");
  return `${FAKER_API_BASE_URL}?_quantity=${quantity || fakerApiDefaultQuantity}&${fields}`;
};

const fetchData = async (quantity: number) => {
  console.log("hooks.useFakerApi.fetchData", { quantity });

  const res = await fetch(fakerApiUrl(quantity));
  console.log("hooks.useFakerApi.fetchData", { res });
  
  if (!res.ok) {
    console.error("Query error", { res });
    throw Error(`${res.statusText} (${res.status})`);
  }

  const data = await res.json();
  console.log("hooks.useFakerApi.fetchData", { data });

  if (data.status !== "OK") {
    console.error("Response status not ok", { status: data.status, code: data.code });
    throw Error(`Error code from fakerapi: ${data.code}`);
  }

  return data.data;
}

export default function useFakerApi({
  quantity
}: {
  quantity: number,
} = {
    quantity: fakerApiDefaultQuantity,
  }): any {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: fakerApiQueryKey,
    queryFn: async () => {
      // pull from local storage
      const cachedData = localStorage.getItem(fakerApiLocalstorageKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const data = await fetchData(quantity);
      const { indexedData, lookups } = buildIndexAndLookups(data);

      console.log("hooks.useFakerApi.query", { data, indexedData, lookups });

      const dataAndLookups = {
        data: indexedData,
        lookups,
      }

      // save to localstorage
      localStorage.setItem(fakerApiLocalstorageKey, JSON.stringify(dataAndLookups));

      return dataAndLookups;
    },
  });

  const reload = () => {
    console.log("hooks.useFakerApi reload", {});
    localStorage.removeItem(fakerApiLocalstorageKey);
    queryClient.resetQueries({ queryKey: fakerApiQueryKey });
  }

  const randomData = async (numRows: number = 1): Promise<{ [index: string]: any }[]> => {
    return fetchData(numRows);
  }

  const add = async (entry: any): Promise<any> => {
    const { data: previousData, lookups } = queryClient.getQueryData(fakerApiQueryKey) as any;
    console.log("hooks.useFakerApi add", { entry, previousData, lookups });

    const entryId = lookupEntryId(entry, lookups) || hash(entry);
    // return undefined;

    const updatedData = {
      ...previousData,
      [entryId]: entry,
    }

    const {
      indexedData,
      lookups: updatedLookups
    } = buildIndexAndLookups(Object.values(updatedData));

    const dataAndLookups = {
      data: indexedData,
      lookups: updatedLookups,
    }

    localStorage.setItem(fakerApiLocalstorageKey, JSON.stringify(dataAndLookups));
    queryClient.setQueryData(fakerApiQueryKey, dataAndLookups);

    return dataAndLookups;
  }

  return { query, reload, randomData, add };
}
