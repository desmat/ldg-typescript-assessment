import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export default function useBinance({
  symbol,
  interval,
  limit,
}: {
  symbol?: string,
  interval?: string,
  limit?: number
} = {
    symbol: "BTCUSDT",
    interval: "1d",
    limit: 180,
  }): any {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["klines", symbol, interval, limit],
    staleTime: 5000, // TODO: find appropriate value
    queryFn: async () => {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`, {
        method: "GET",
      });

      console.log("hooks.useBinance useQuery.queryFn", { res });
      if (!res.ok) {
        console.error("Query error", { res });
        throw `${res.statusText} (${res.status})`;
      }

      const data = await res.json();
      console.log("hooks.useBinance useQuery.queryFn", { data });
      // return data;

      return {
        // for analyzing response
        // openTime180Days: data
        //   .sort((a: any[], b: any[]) => a[0] - b[0])
        //   .splice(data.length - 180, data.length)
        //   .map((entry: any[]) => new Date(entry[0])),
        prices30days: data
          .sort((a: any[], b: any[]) => a[0] - b[0])
          .splice(data.length - 30, data.length)
          .map((entry: any[]) => [entry[0], parseFloat(entry[4])]),
        volume180days: data
          .sort((a: any[], b: any[]) => a[0] - b[0])
          .splice(data.length - 180, data.length)
          .map((entry: any[]) => [parseFloat(entry[5]), (entry[2] - entry[3]) / entry[2] * 100]),
      }
    }
  });

  const reload = () => {
    // console.log("hooks.useBinance reload", { });
    queryClient.resetQueries({ queryKey: ["klines", symbol, interval, limit] });
  }

  return { query, reload };
}
