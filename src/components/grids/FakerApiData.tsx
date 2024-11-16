import { ValueFormatterParams } from "@ag-grid-community/core";
import moment from "moment";
import { Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import DashboardCard from "../DashboardCard";
import Grid from "./Grid";

function currencyFormatter(params: ValueFormatterParams) {
  return "$" + formatNumber(params.value);
}

function numberFormatter(params: ValueFormatterParams) {
  return formatNumber(params.value);
}

function dateFormatter(params: ValueFormatterParams) {
  const format = moment.localeData().longDateFormat('L');
  return moment(params.value).format(format);
}

function formatNumber(number: number) {
  return Math.floor(number).toLocaleString();
}

export default function FakerApiData({
  data,
  loading,
  reload, 
  add,
}: {
  data: any[],
  loading?: boolean,
  reload?: () => void,
  add?: () => void,
}) {
  const options = {
    rowData: data,
    columnDefs: [
      { field: "company", tooltipField: "company" },
      { field: "country", tooltipField: "country", flex: 3 },
      { field: "state", flex: 3 },
      { field: "city", tooltipField: "city", flex: 4 },
      { field: "zipcode", flex: 2 },
      { field: "employees", flex: 2, valueFormatter: numberFormatter, cellClass: "align-right" },
      { field: "revenue", flex: 2, valueFormatter: currencyFormatter, cellClass: "align-right" },
      { field: "website", tooltipField: "website", flex: 2 },
      { field: "sales_rep", tooltipField: "sales_rep", flex: 2 },
      { field: "last_contacted", flex: 2, valueFormatter: dateFormatter },
      { field: "purchased", flex: 2, cellClass: "align-center" },
      { field: "notes", tooltipField: "notes", flex: 10 },

    ],
    defaultColDef: {
      flex: 5,
      tooltipShowDelay: 0,
    },
  };

  const Footer = () => {
    return (
      <Stack direction="horizontal" gap={2} className="d-flex justify-content-center">
        <Link to="#" onClick={reload}>[Reload]</Link>
        <Link to="fakerapi/add">[Add Record]</Link>
        </Stack>
    )
  }

  return (
    <DashboardCard
      title="FakerAPI Data"
      footer={<Footer />}
    >
      <Grid options={options} loading={loading} />
    </DashboardCard>
  );
}
