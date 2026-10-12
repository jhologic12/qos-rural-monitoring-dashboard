import { useMemo } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Link2Off,
  Network,
  XCircle,
} from "lucide-react";
import { useTimeSeries } from "./hooks/useTimeSeries";
import { KpiCard } from "./components/KpiCard";
import { LatencyJitterChart } from "./components/LatencyJitterChart";
import { NodesPanel } from "./components/NodesPanel";
import { EventsTable } from "./components/EventsTable";
import { umbrales } from "./lib/constants";

type Estado = "optimo" | "degradado" | "critico";

const ESTADOS = {
  optimo: { label: "ÓPTIMO", color: "#22c55e", Icon: CheckCircle2 },
  degradado: { label: "DEGRADADO", color: "#facc15", Icon: AlertTriangle },
  critico: { label: "CRÍTICO", color: "#ef4444", Icon: XCircle },
} as const;

function getEstado(latencia: number, jitter: number, perdida: number): Estado {
  if (
    latencia >= umbrales.latenciaCritico ||
    jitter >= umbrales.jitterCritico ||
    perdida >= 5
  ) {
    return "critico";
  }
  if (
    latencia >= umbrales.latenciaPrecaucion ||
    jitter >= umbrales.jitterPrecaucion
  ) {
    return "degradado";
  }
  return "optimo";
}

const avg = (arr: number[]) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

function EstadoGlobalCard({ estado }: { estado: Estado }) {
  const { label, color, Icon } = ESTADOS[estado];
  return (
    <div className="flex min-h-[120px] flex-col justify-between rounded-xl border border-[#1e2a40] bg-[#111a2b] p-4 shadow-lg shadow-black/20">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#e6edf6]">
        ESTADO OPERATIVO GLOBAL
      </h3>
      <div className="flex justify-center">
        <div
          className="flex items-center gap-3 rounded-full border-2 px-6 py-2"
          style={{
            borderColor: color,
            boxShadow: `0 0 24px ${color}55, inset 0 0 12px ${color}22`,
          }}
        >
          <Icon size={28} color={color} />
          <span className="text-2xl font-bold text-white">{label}</span>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-[#8b98ad]">
        <span className="flex items-center gap-1">
          <i className="h-2 w-2 rounded-full bg-[#22c55e]" /> ÓPTIMO
        </span>
        <span className="flex items-center gap-1">
          <i className="h-2 w-2 rounded-full bg-[#facc15]" /> DEGRADADO
        </span>
        <span className="flex items-center gap-1">
          <i className="h-2 w-2 rounded-full bg-[#ef4444]" /> CRÍTICO
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const { data: timeSeries = [] } = useTimeSeries(24);

  const recent = timeSeries.slice(-12);
  const latencia = avg(recent.map((p) => p.latencia));
  const jitter = avg(recent.map((p) => p.jitter));
  const perdida = timeSeries[timeSeries.length - 1]?.perdidaPaquetes ?? 0;

  const estado = useMemo(
    () => getEstado(latencia, jitter, perdida),
    [latencia, jitter, perdida],
  );

  return (
    <div className="min-h-screen bg-[#0b1220] p-6 text-[#e6edf6]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4">
        {/* Header */}
        <header className="flex items-center gap-3 rounded-xl border border-[#1e2a40] bg-[#0f1726] px-5 py-4">
          <Network size={26} color="#38bdf8" />
          <h1 className="text-lg font-bold uppercase tracking-wide text-white md:text-xl">
            SISTEMA DE MONITOREO PREVENTIVO QoS - RED EDUCATIVA RURAL
          </h1>
        </header>

        {/* Fila 1: KPIs */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <EstadoGlobalCard estado={estado} />
          <KpiCard
            title="LATENCIA PROMEDIO"
            value={latencia.toFixed(0)}
            unit="ms"
            tone="ok"
            Icon={Clock}
            trend="down"
            spark={timeSeries.slice(-30).map((p) => p.latencia)}
          />
          <KpiCard
            title="JITTER"
            value={jitter.toFixed(1)}
            unit="ms"
            tone="ok"
            Icon={Activity}
            spark={timeSeries.slice(-30).map((p) => p.jitter)}
          />
          <KpiCard
            title="PÉRDIDA DE PAQUETES"
            value={perdida.toFixed(1) + "%"}
            tone="ok"
            Icon={Link2Off}
          />
          <KpiCard
            title="UTILIZACIÓN DE INTERFAZ (SNMP)"
            value="12.4"
            unit="Mbps"
            tone="ok"
            trend="up"
            progress={40}
          />
        </section>

        {/* Fila 2: gráfico + nodos */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-[#1e2a40] bg-[#111a2b] p-4">
            <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#e6edf6]">
              EVOLUCIÓN EN TIEMPO REAL DE LATENCIA Y JITTER
            </h2>
            <LatencyJitterChart height={300} />
          </div>
          <NodesPanel />
        </section>

        {/* Fila 3: eventos */}
        <EventsTable page={1} pageSize={5} />
      </div>
    </div>
  );
}
