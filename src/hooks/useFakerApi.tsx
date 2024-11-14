import {
  useQuery,
} from '@tanstack/react-query';

export default function useFakerApi({
  quantity
}: {
  quantity?: number,
} = {
  quantity: 10,
  }): any {
  const query = useQuery({
    queryKey: [quantity],
    queryFn: async () => {
      // pull from local storage
      const cachedData = localStorage.getItem(`fakeapi:quantity=${quantity}`);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const res = await fetch(`https://Xfakerapi.it/api/v2/custom?_quantity=${quantity}&company=company_name&country=country&state=state&city=city&zipcode=postcode&employees=counter&revenue=number&website=website&sales_rep=first_name&last_contacted=date&purchased=boolean&notes=text`, {
        method: "GET",
      });

      console.log("hooks.useFakeapi useQuery.queryFn", { res });
      if (!res.ok) {
        console.error("Query error", { res });
        throw `${res.statusText} (${res.status})`;
      }

      const data = await res.json();
      console.log("hooks.useFakeapi useQuery.queryFn", { data });

      if (data.status != "OK") {
        console.error("Response status not ok", { status: data.status, code: data.code });
        throw `Error code from fakerapi: ${data.code}`;
      }

      const transformedData = data.data;

      // save to localstorage
      localStorage.setItem(`fakeapi:quantity=${quantity}`, JSON.stringify(transformedData));

      return transformedData;
    },
  });

  // TODO mutate, reset

  return { query };
}
