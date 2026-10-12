import React from "react";
import { getStatus } from "@/lib/status";

interface GlobalStatusCardProps {
  latencia: number;
  jitter: number;
  perdidaPaquetes: number;
}

export const GlobalStatusCard: React.FC<GlobalStatusCardProps> = ({
  latencia,
  jitter,
  perdidaPaquetes,
}) => {
  const status = getStatus(latencia, jitter, perdidaPaquetes);

  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            ESTADO OPERATIVO GLOBAL
          </h3>
          <p className="text-2xl font-bold">{status.toUpperCase()}</p>
        </div>

        <div className="p-3 rounded-xl" style={{
          background: status === "optimo"
            ? "rgba(34, 197, 94, 0.15)"
            : status === "degradado"
              ? "rgba(250, 204, 21, 0.15)"
              : "rgba(239, 68, 68, 0.15)",
          border: `1px solid ${status === "optimo" ? "rgba(34, 197, 94, 0.3)" : status === "degradado" ? "rgba(250, 204, 21, 0.3)" : "rgba(239, 68, 68, 0.3)"}`,
          ...(status === "optimo" && "box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);")
        }} />

      </div>

      <div className="mt-3 flex gap-2">
        <span className="w-3 h-3 rounded-full bg-emerald-500/60 border-2 bg-card" title="Óptimo" />
        <span className="w-3 h-3 rounded-full bg-amber-500/60 border-2 bg-card" title="Degradado" />
        <span className="w-3 h-3 rounded-full bg-red-500/60 border-2 bg-card" title="Crítico" />
      </div>

      <p className="text-xs text-slate-500 mt-2">
        Latencia: {latencia} ms · Jitter: {jitter} ms · Pérdida: {perdidaPaquetes}%
      </p>
    </div>
  );
};