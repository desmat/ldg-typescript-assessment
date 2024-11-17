import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  BINANCE_BASE_URL,
  BINANCE_DEFAULT_INTERVAL,
  BINANCE_DEFAULT_LIMIT,
  BINANCE_DEFAULT_SYMBOL
} from '../types/Binance';

export default function useBinance({
  symbol,
  interval,
  limit,
}: {
  symbol?: string,
  interval?: string,
  limit?: number
} = {
    symbol: BINANCE_DEFAULT_SYMBOL,
    interval: BINANCE_DEFAULT_INTERVAL,
    limit: BINANCE_DEFAULT_LIMIT,
  }): any {
  const queryClient = useQueryClient();
  const queryKey = () => ["klines", symbol, interval, limit];

  const query = useQuery({
    queryKey: queryKey(),
    staleTime: 5 * 60 * 1000, // 5 mins
    queryFn: async () => {
      const res = await fetch(`${BINANCE_BASE_URL}?symbol=${symbol}&interval=${interval}&limit=${limit}`);
      console.log("hooks.useBinance useQuery.queryFn", { res });

      if (!res.ok) {
        console.error("Query error", { res });
        throw Error(`${res.statusText} (${res.status})`);
      }

      const data = await res.json();
      console.log("hooks.useBinance useQuery.queryFn", { data });
      // return data;

      return {
        // for analyzing response
        // openTime180Days: data
        //   .sort((a: any[], b: any[]) => a[0] - b[0])
        //   .slice(data.length - 180, data.length)
        //   .map((entry: any[]) => new Date(entry[0])),
        prices30days: data
          .sort((a: any[], b: any[]) => a[0] - b[0])
          .slice(data.length - 30, data.length)
          .map((entry: any[]) => [entry[0], parseFloat(entry[4])]),
        volume180days: data
          .sort((a: any[], b: any[]) => a[0] - b[0])
          .slice(data.length - 180, data.length)
          .map((entry: any[]) => [parseFloat(entry[5]), (entry[2] - entry[3]) / entry[2] * 100]),
      }
    }
  });

  const reload = () => {
    // console.log("hooks.useBinance reload", { });
    queryClient.resetQueries({ queryKey: queryKey() });
  }

  return { query, reload };
}
