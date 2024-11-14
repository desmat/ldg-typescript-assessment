import * as echarts from 'echarts';
import { useEffect, useRef, useState } from "react";

export default function Chart({
  option,
  loading,
}: {
  option: any,
  loading?: boolean,
}) {
  let [chart, setChart] = useState<any>()
  const chartRef = useRef<any>();
  console.log("components.charts.Chart", { chartRef });

  const resizeObserver = new window.ResizeObserver((entries) => {
    entries.map(({ target }: { target: any }) => {
      const instance = echarts.getInstanceByDom(target);
      if (instance) {
        instance.resize();
      }
    });
  });

  useEffect(() => {
    console.log("components.charts.Chart useEffect", { option });

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

  return (
      <div
        className="Chart"
        ref={chartRef}
        style={{ height: 400 }}
      />
  );
}
