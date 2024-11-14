import useBinance from "../hooks/useBinance";
import useFakerApi from "../hooks/useFakerApi";

import BitcoinClosingPrices from "../components/charts/BitcoinClosingPrices";
import FakeapiData from "../components/charts/FakerApiData";
import BitcoinVolumeOverPriceSpread from "../components/charts/BitcoinVolumeOverPriceSpread";
import { Stack } from "react-bootstrap";

export default function Dashboard() {
  const { query: binanceQuery, reload: reloadBinance } = useBinance();
  const { query: fakerapiQuery } = useFakerApi();
  console.log("pages.Dashboard", { binanceQuery, fakerapiQuery });

  return (
    <div className="Dashboard" style={{ width: "100%" }}>
      <Stack gap={3} className="d-flex justify-content-center" style={{ width: "100%" }}>
        {binanceQuery.error &&
          <p><i>Error: {binanceQuery.error}</i></p>
        }
        {!binanceQuery.error &&
          <BitcoinClosingPrices
            data={binanceQuery.data?.prices30days}
            reload={reloadBinance}
            loading={!binanceQuery.isFetched}
          />
        }

        {binanceQuery.error &&
          <p><i>Error: {binanceQuery.error}</i></p>
        }
        {!binanceQuery.error &&
          <BitcoinVolumeOverPriceSpread
            data={binanceQuery.data?.volume180days}
            reload={reloadBinance}
            loading={!binanceQuery.isFetched}
          />
        }

        {!fakerapiQuery.isFetched &&
          <p><i>Loading...</i></p>
        }
        {fakerapiQuery.error &&
          <p><i>Error: {fakerapiQuery.error}</i></p>
        }
        {fakerapiQuery.isFetched && !fakerapiQuery.isError &&
          <FakeapiData data={fakerapiQuery.data} />
        }
      </Stack>
    </div>
  );
}
