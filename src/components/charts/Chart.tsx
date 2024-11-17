import useResizeObserver from '@react-hook/resize-observer'
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from "react";

export default function Chart({
  option,
  loading,
}: {
  option: any,
  loading?: boolean,
}) {
  const [chart, setChart] = useState<any>()
  const chartRef = useRef<any>();
  // console.log("components.charts.Chart", { chartRef });

  useResizeObserver(chartRef.current, () => chart && chart.resize());

  useEffect(() => {
    // console.log("components.charts.Chart useEffect", { option });

    let c = chart;
    if (!c) {
      c = echarts.init(chartRef.current);
      setChart(c);
    }

    c.setOption(option, true);

    if (loading) {
      c.showLoading();
    } else {
      c.hideLoading();
    }
  }, [option, loading, chart]);

  return (
      <div
        className="Chart"
        ref={chartRef}
        style={{ height: 400 }}
      />
  );
}
