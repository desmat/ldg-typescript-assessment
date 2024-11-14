import DashboardCard from "../DashboardCard";

export default function FakerApiData({ data }: { data: any[] }) {
  return (
    <DashboardCard
      title="FakerAPI Data"
    >
      <p>Num data: {data.length}</p>
      <p>First entry: {JSON.stringify(data[0], null, '\n')}</p>
      <p>Last entry: {JSON.stringify(data[data.length - 1], null, '\t\n')}</p>
    </DashboardCard>
  );
}
