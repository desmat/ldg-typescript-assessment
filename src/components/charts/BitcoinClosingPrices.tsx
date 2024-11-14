import * as echarts from 'echarts';
import moment from 'moment';
import { useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import { Link } from 'react-router-dom';
import DashboardCard from '../DashboardCard';

const formatDate = (d: number) => moment(d).format("MM/DD");

export default function BitcoinClosingPrices({
  data,
  loading,
  reload,
}: {
  data: any[],
  loading?: boolean,
  reload?: () => void,
}) {
  let [chart, setChart] = useState<any>()
  const chartRef = useRef<any>();
  console.log("components.charts.BitcoinClosingPrices", { chartRef });

  const option = {
    xAxis: {
      type: 'category',
      data: data?.length
        // actual data
        ? data.map((e: any) => formatDate(e[0]))
        // placeholder dates to smooth loading/loaded transition
        : Array.from(Array(30).keys()).map((n: number) => formatDate(moment().add(n - 30, "day").valueOf()))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data && data.map((e: any) => e[1]),
        type: 'line',
        smooth: true
      }
    ]
  };

  const resizeObserver = new window.ResizeObserver((entries) => {
    entries.map(({ target }: { target: any }) => {
      const instance = echarts.getInstanceByDom(target);
      if (instance) {
        instance.resize();
      }
    });
  });

  useEffect(() => {
    console.log("components.charts.BitcoinClosingPrices useEffect", { option });

    if (!chart) {
      chart = echarts.init(chartRef.current);
      resizeObserver.observe(chartRef.current);
      setChart(chart);
    }

    chart.setOption(option, true);

    if (loading) {
      chart.showLoading();
    } else {
      chart.hideLoading();
    }
  }, [option, loading]);

  const Footer = () => {
    return (
      <Stack direction="horizontal" gap={2} className="d-flex justify-content-center">
        <Link to="#" onClick={reload}>[Reload]</Link>
      </Stack>
    )
  }

  return (
    <DashboardCard
      title="Bitcoin Closing Prices (30 Days)"
      footer={<Footer />}
    >
      <div
        ref={chartRef}
        style={{ height: 400 }}
      />
    </DashboardCard>
  );
}
