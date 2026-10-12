import type { ComponentType, ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Tone = "ok" | "warning" | "critical" | "info" | "jitter";

const TONE: Record<Tone, string> = {
  ok: "#4ade80",
  warning: "#facc15",
  critical: "#ef4444",
  info: "#38bdf8",
  jitter: "#f59e0b",
};

export interface KpiCardProps {
  title: string;
  value: string;
  unit?: string;
  tone?: Tone;
  Icon?: ComponentType<{ size?: number; color?: string }>;
  trend?: "up" | "down" | "neutral";
  spark?: number[];
  progress?: number; // 0-100
  children?: ReactNode;
}

function MiniSpark({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;
  const w = 200;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * w},${h - 4 - ((v - min) / range) * (h - 8)}`,
    )
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-9 w-full"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function KpiCard({
  title,
  value,
  unit,
  tone = "ok",
  Icon,
  trend = "neutral",
  spark,
  progress,
  children,
}: KpiCardProps) {
  const color = TONE[tone];
  return (
    <div className="flex min-h-[120px] flex-col justify-between rounded-xl border border-[#1e2a40] bg-[#111a2b] p-4 shadow-lg shadow-black/20">
      <div className="flex items-start justify-between">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#e6edf6]">
          {title}
        </h3>
        {Icon && <Icon size={16} color={color} />}
      </div>

      <div className="my-2 flex items-center justify-center gap-3">
        <span
          className="text-4xl font-bold"
          style={{ color, textShadow: `0 0 18px ${color}66` }}
        >
          {value}
          {unit && <span className="ml-1 text-2xl font-semibold">{unit}</span>}
        </span>
        {trend === "down" && <ArrowDownRight size={24} color={color} />}
        {trend === "up" && <ArrowUpRight size={24} color={color} />}
      </div>

      {spark && <MiniSpark data={spark} color={color} />}
      {progress !== undefined && (
        <div className="h-2 w-full rounded-full bg-[#0d1524]">
          <div
            className="h-2 rounded-full"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              background: `linear-gradient(90deg, #16a34a, ${color})`,
            }}
          />
        </div>
      )}
      {children}
    </div>
  );
}
