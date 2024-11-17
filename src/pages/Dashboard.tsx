import { Stack } from "react-bootstrap";
import BitcoinClosingPrices from "../components/charts/BitcoinClosingPrices";
import FakeapiData from "../components/grids/FakerApiData";
import BitcoinVolumeOverPriceSpread from "../components/charts/BitcoinVolumeOverPriceSpread";
import useBinance from "../hooks/useBinance";
import useFakerApi from "../hooks/useFakerApi";

export default function Dashboard() {
  const { query: binanceQuery, reload: reloadBinance } = useBinance();
  const { query: fakerapiQuery, reload: reloadFakerApi, add: addFakerApiRow } = useFakerApi();
  // console.log("pages.Dashboard", { binanceQuery, fakerapiQuery });

  return (
    <div className="Dashboard">
      <Stack gap={3} className="d-flex justify-content-center">
        {binanceQuery.error &&
          <p><i>Error: {binanceQuery.error}</i></p>
        }
        {!binanceQuery.error &&
          <BitcoinClosingPrices
            data={binanceQuery.data?.prices30days}
            loading={!binanceQuery.isFetched}
            reload={reloadBinance}
          />
        }

        {binanceQuery.error &&
          <p><i>Error: {binanceQuery.error}</i></p>
        }
        {!binanceQuery.error &&
          <BitcoinVolumeOverPriceSpread
            data={binanceQuery.data?.volume180days}
            loading={!binanceQuery.isFetched}
            reload={reloadBinance}
          />
        }

        {fakerapiQuery.error &&
          <p><i>Error: {fakerapiQuery.error}</i></p>
        }
        {!fakerapiQuery.isError &&
          <FakeapiData
           data={fakerapiQuery.data?.data && Object.values(fakerapiQuery.data?.data)} 
           loading={!fakerapiQuery.isFetched}
           reload={reloadFakerApi}
           add={addFakerApiRow}
           />
        }
      </Stack>
    </div>
  );
}
