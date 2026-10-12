import React from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useTimeSeries } from "../hooks/useTimeSeries";
import type { Metric } from "../types/qos";

interface SparklineProps {
  metric: "latencia" | "jitter" | "perdida";
  height?: number;
  dataPoints?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  metric,
  height = 30,
  dataPoints = 10,
}) => {
  const { data: timeSeries } = useTimeSeries(1);
  const points = timeSeries?.slice(0, dataPoints) || [];

  const getColor = (): string => {
    switch (metric) {
      case "latencia":
        return "#38bdf8";
      case "jitter":
        return "#f59e0b";
      case "perdida":
        return "#ef4444";
      default:
        return "#8b98ad";
    }
  };

  const getValue = (tp: any): number => {
    switch (metric) {
      case "latencia":
        return tp.latencia;
      case "jitter":
        return tp.jitter;
      case "perdida":
        return tp.perdidaPaquetes;
      default:
        return 0;
    }
  };

  const minVal = Math.min(...points.map(getValue), 0);
  const maxVal = Math.max(...points.map(getValue), 0);
  const range = maxVal - minVal || 1;

  const normalized = points.map((tp) => ({
    x: points.indexOf(tp),
    y: (getValue(tp) - minVal) / range,
  }));

  const chartHeight = height;
  const chartWidth = dataPoints;

  return (
    <div className="relative w-full h-[height]">
      <svg
        className="relative inset-0 w-full h-full"
        viewBox="0 0 {chartWidth} {chartHeight}"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <path
          d={() => {
            if (normalized.length < 2) {
              return "M0 0 L0 0";
            }
            let path = `M${normalized[0].x} ${chartHeight - normalized[0].y * chartHeight}`;
            for (let i = 1; i < normalized.length; i++) {
              const p = normalized[i];
              path += ` L${p.x} ${chartHeight - p.y * chartHeight}`;
            }
            return path;
          }}
          fill={getColor()}
          opacity="0.3"
        />
        <path
          d={() => {
            if (normalized.length < 2) {
              return "M0 0 L0 0";
            }
            let path = `M${normalized[0].x} ${chartHeight - normalized[0].y * chartHeight}`;
            for (let i = 1; i < normalized.length; i++) {
              const p = normalized[i];
              path += ` L${p.x} ${chartHeight - p.y * chartHeight}`;
            }
            path += ` L${normalized[normalized.length - 1].x} ${chartHeight}`;
            path += ` L${normalized[0].x} ${chartHeight}`;
            return path;
          }}
          fill={getColor()}
          opacity="0.1"
        />
        <path
          d={() => {
            if (normalized.length < 2) {
              return "M0 0 L0 0";
            }
            let path = `M${normalized[0].x} ${chartHeight - normalized[0].y * chartHeight}`;
            for (let i = 1; i < normalized.length; i++) {
              const p = normalized[i];
              path += ` L${p.x} ${chartHeight - p.y * chartHeight}`;
            }
            return path;
          }}
          stroke={getColor()}
          strokeWidth={2}
          fill="none"
        />
      </svg>
    </div>
  );
};