import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { FakerApiFieldDefinitions } from '../types/FakerApi';

const fakerApiQueryKey = ["fakeapi", "data"];
const fakerApiLocalstorageKey = "fakeapi:data";
const fakerApiDefaultQuantity = 10
const fakerApiUrl = (quantity?: number) => {
  const fields = Object.entries(FakerApiFieldDefinitions)
    .map(([k, v]) => [k, v.fakerApiType].join("="))
    .join("&");
  return `https://fakerapi.it/api/v2/custom?_quantity=${quantity || fakerApiDefaultQuantity}&${fields}`;
};

const fetchData = async (quantity: number) => {
  console.log("hooks.useFakeapi.fetchData", { quantity });

  const res = await fetch(fakerApiUrl(quantity), {
    method: "GET",
  });

  console.log("hooks.useFakeapi.fetchData", { res });
  if (!res.ok) {
    console.error("Query error", { res });
    throw Error(`${res.statusText} (${res.status})`);
  }

  const data = await res.json();
  console.log("hooks.useFakeapi.fetchData", { data });

  if (data.status !== "OK") {
    console.error("Response status not ok", { status: data.status, code: data.code });
    throw Error(`Error code from fakerapi: ${data.code}`);
  }

  return data.data;
}

export default function useFakerApi({
  quantity
}: {
  quantity?: number,
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

      const data = await fetchData(fakerApiDefaultQuantity);

      // save to localstorage
      localStorage.setItem(fakerApiLocalstorageKey, JSON.stringify(data));

      return data;
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

  const add = async (entry: any): Promise<{ [index: string]: any }[]> => {
    const previousData = queryClient.getQueryData(fakerApiQueryKey) as any[];
    console.log("hooks.useFakerApi add", { entry, previousData });

    // TODO add or update

    const updatedData = [
      ...previousData,
      entry,
    ];

    localStorage.setItem(fakerApiLocalstorageKey, JSON.stringify(updatedData));
    queryClient.setQueryData(fakerApiQueryKey, updatedData);

    return updatedData;
  }

  return { query, reload, randomData, add };
}
