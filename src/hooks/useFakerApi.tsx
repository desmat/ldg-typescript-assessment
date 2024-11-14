import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const fakerApiDefaultQuantity = 10
const fakerApiUrl = (quantity?: number) => `https://fakerapi.it/api/v2/custom?_quantity=${quantity || fakerApiDefaultQuantity}&company=company_name&country=country&state=state&city=city&zipcode=postcode&employees=counter&revenue=number&website=website&sales_rep=first_name&last_contacted=date&purchased=boolean&notes=text`;
const fakerApiQueryKey = ["fakeapi", "data"];
const fakerApiLocalstorageKey = "fakeapi:data";

const fetchData = async (quantity: number) => {
  console.log("hooks.useFakeapi.fetchData", { quantity });

  const res = await fetch(fakerApiUrl(quantity), {
    method: "GET",
  });

  console.log("hooks.useFakeapi.fetchData", { res });
  if (!res.ok) {
    console.error("Query error", { res });
    throw `${res.statusText} (${res.status})`;
  }

  const data = await res.json();
  console.log("hooks.useFakeapi.fetchData", { data });

  if (data.status != "OK") {
    console.error("Response status not ok", { status: data.status, code: data.code });
    throw `Error code from fakerapi: ${data.code}`;
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

  const add = async () => {
    const previousData = queryClient.getQueryData(fakerApiQueryKey) as any[];
    console.log("hooks.useFakerApi add", { previousData });

    const data = await fetchData(1);

    const updatedData = [
      ...previousData,
      ...data,
    ];

    localStorage.setItem(fakerApiLocalstorageKey, JSON.stringify(updatedData));
    queryClient.setQueryData(fakerApiQueryKey, updatedData);
  }

  // TODO mutate

  return { query, reload, add };
}
