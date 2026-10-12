import { useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { useTimeSeries } from "../hooks/useTimeSeries";

const COLOR = {
  latencia: "#38bdf8",
  jitter: "#f59e0b",
  warning: "#facc15",
  critical: "#ef4444",
  muted: "#8b98ad",
  text: "#e6edf6",
  border: "#1e2a40",
  grid: "rgba(30, 42, 64, 0.55)",
  bg: "#0b1220",
};

interface Props {
  height?: number;
}

export const LatencyJitterChart = ({ height = 280 }: Props) => {
  const { data: timeSeries = [], isError } = useTimeSeries(24);

  const option = useMemo(() => {
    const last = timeSeries[timeSeries.length - 1];
    // ~5 etiquetas visibles en el eje X
    const labelInterval = Math.max(0, Math.floor(timeSeries.length / 5) - 1);

    const axisName = {
      color: COLOR.muted,
      fontSize: 11,
      fontWeight: 500 as const,
    };

    return {
      animationDuration: 300,
      grid: { left: 58, right: 58, top: 24, bottom: 42 },
      tooltip: {
        trigger: "axis",
        backgroundColor: COLOR.bg,
        borderColor: COLOR.border,
        borderWidth: 1,
        textStyle: { color: COLOR.text, fontSize: 12 },
        axisPointer: { type: "line", lineStyle: { color: COLOR.border } },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const list = Array.isArray(params) ? params : [params];
          const lat = list.find((p) => p.seriesName === "Latencia");
          const jit = list.find((p) => p.seriesName === "Jitter");
          const hora = list[0]?.axisValue ?? "";
          return `${hora} - Latencia: <b>${Number(lat?.value).toFixed(1)} ms</b><br/>Jitter: <b>${Number(jit?.value).toFixed(1)} ms</b>`;
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: timeSeries.map((p) => p.hora),
        name: "TIEMPO",
        nameLocation: "middle",
        nameGap: 28,
        nameTextStyle: axisName,
        axisLine: { lineStyle: { color: COLOR.border } },
        axisTick: { show: false },
        splitLine: { show: true, lineStyle: { color: COLOR.grid } },
        axisLabel: {
          color: COLOR.muted,
          fontSize: 11,
          interval: labelInterval,
        },
      },
      yAxis: [
        {
          type: "value",
          name: "LATENCIA (ms)",
          nameLocation: "middle",
          nameGap: 38,
          nameTextStyle: axisName,
          min: 0,
          max: 100,
          interval: 20,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: COLOR.muted, fontSize: 11 },
          splitLine: { lineStyle: { color: COLOR.grid } },
        },
        {
          type: "value",
          name: "JITTER (ms)",
          position: "right",
          nameLocation: "middle",
          nameGap: 38,
          nameTextStyle: axisName,
          min: 0,
          max: 20,
          interval: 5,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: COLOR.muted, fontSize: 11 },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: "Latencia",
          type: "line",
          yAxisIndex: 0,
          smooth: true,
          showSymbol: false,
          data: timeSeries.map((p) => p.latencia),
          lineStyle: {
            width: 2.5,
            color: COLOR.latencia,
            shadowColor: COLOR.latencia,
            shadowBlur: 10,
          },
          itemStyle: { color: COLOR.latencia },
          markPoint: {
            silent: true,
            symbol: "circle",
            symbolSize: 9,
            label: { show: false },
            itemStyle: {
              color: COLOR.latencia,
              borderColor: COLOR.bg,
              borderWidth: 2,
            },
            data: last
              ? [{ coord: [timeSeries.length - 1, last.latencia] }]
              : [],
          },
          markLine: {
            silent: true,
            symbol: "none",
            data: [
              {
                yAxis: 80,
                lineStyle: { color: COLOR.critical, type: "dashed", width: 1 },
                label: {
                  formatter: "UMBRAL CRÍTICO (80 ms / 10 ms)",
                  position: "insideEndTop",
                  color: COLOR.critical,
                  fontSize: 10,
                },
              },
              {
                yAxis: 50,
                lineStyle: { color: COLOR.warning, type: "dashed", width: 1 },
                label: {
                  formatter: "UMBRAL PRECAUCIÓN (50 ms / 5 ms)",
                  position: "insideEndTop",
                  color: COLOR.warning,
                  fontSize: 10,
                },
              },
            ],
          },
        },
        {
          name: "Jitter",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          showSymbol: false,
          data: timeSeries.map((p) => p.jitter),
          lineStyle: {
            width: 2.5,
            color: COLOR.jitter,
            shadowColor: COLOR.jitter,
            shadowBlur: 10,
          },
          itemStyle: { color: COLOR.jitter },
          markPoint: {
            silent: true,
            symbol: "circle",
            symbolSize: 9,
            label: { show: false },
            itemStyle: {
              color: COLOR.jitter,
              borderColor: COLOR.bg,
              borderWidth: 2,
            },
            data: last ? [{ coord: [timeSeries.length - 1, last.jitter] }] : [],
          },
        },
      ],
    };
  }, [timeSeries]);

  if (isError || timeSeries.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-sm"
        style={{ height, width: "100%", color: COLOR.muted }}
      >
        {isError
          ? "Error al cargar serie de tiempo"
          : "Cargando serie de tiempo..."}
      </div>
    );
  }

  return <ReactECharts option={option} style={{ height, width: "100%" }} />;
};
