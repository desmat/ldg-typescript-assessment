import moment from 'moment';
import { Button, Stack } from "react-bootstrap";
import DashboardCard from '../DashboardCard';
import Chart from './Chart';

export default function BitcoinClosingPrices({
  data,
  loading,
  reload,
}: {
  data: any[],
  loading?: boolean,
  reload?: () => void,
}) {
  // console.log("components.charts.BitcoinClosingPrices", { data, loading });

  const option = {
    xAxis: {
      type: 'category',
      data: data && data.map((e: any) => moment(e[0]).format("MM/DD")),
    },
    yAxis: {
      type: 'value',
      name: "Closing Price (USD)",
    },
    series: [
      {
        data: data && data.map((e: any) => e[1]),
        type: 'line',
        smooth: true,
      }
    ]
  };

  const Footer = () => {
    return (
      <Stack direction="horizontal" gap={2} className="d-flex justify-content-center">
        <Button variant="outline-secondary" onClick={reload}>Reload</Button>
      </Stack>
    )
  }

  return (
    <DashboardCard
      title="Bitcoin Closing Prices (30 Days)"
      footer={<Footer />}
    >
      <Chart option={option} loading={loading} />
    </DashboardCard>
  );
}
