import { Button, Stack } from "react-bootstrap";
import DashboardCard from '../DashboardCard';
import Chart from './Chart';

export default function BitcoinVolumeOverPriceSpread({
  data,
  loading,
  reload,
}: {
  data: any[],
  loading?: boolean,
  reload?: () => void,
}) {
  console.log("components.charts.BitcoinClosingPrices", { data, loading });

  const option = {
    xAxis: {
      name: "Volume",
    },
    yAxis: {
      name: "High/Low Price %",
    },
    series: [
      {
        symbolSize: 12,
        data: data,
        type: 'scatter',
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
      title="Bitcoin Volute over Price Spread (180 Days)"
      footer={<Footer />}
    >
      <Chart option={option} loading={loading} />
    </DashboardCard>
  );
}
