import DashboardCard from "../DashboardCard";

export default function BitcoinVolumeOverPriceSpread({ data }: { data: any[] }) {
  return (
    <DashboardCard
      title="Bitcoin Volute over Price Spread"
    >
      <p>Num data: {data.length}</p>
      <p>First entry: {JSON.stringify(data[0], null, '\n')}</p>
      <p>Last entry: {JSON.stringify(data[data.length - 1], null, '\t\n')}</p>
    </DashboardCard>
  );
}
