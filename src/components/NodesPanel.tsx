import type { ReactNode } from "react";
import { Cpu, MemoryStick, Router } from "lucide-react";
import { useNodes } from "../hooks/useNodes";
import type { Node } from "../types/qos";

const ESTADO_COLOR: Record<Node["estado"], string> = {
  online: "#22c55e",
  degradado: "#facc15",
  offline: "#ef4444",
};

function UsageBar({ icon, value }: { icon: ReactNode; value: number }) {
  return (
    <div className="flex items-center gap-2 text-[10px] text-[#8b98ad]">
      {icon}
      <div className="h-1.5 flex-1 rounded-full bg-[#0d1524]">
        <div
          className="h-1.5 rounded-full"
          style={{
            width: `${Math.min(100, Math.max(0, value))}%`,
            background: "linear-gradient(90deg, #16a34a, #4ade80)",
          }}
        />
      </div>
      <span className="w-8 text-right">{value}%</span>
    </div>
  );
}

export const NodeCard = ({ node }: { node: Node }) => {
  const color = ESTADO_COLOR[node.estado];
  return (
    <article className="rounded-lg border border-[#1e2a40] bg-[#15203a] p-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded bg-[#0d1524]">
          <Router size={18} color="#8b98ad" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">{node.nombre}</p>
          <p className="text-[11px] text-[#8b98ad]">{node.ip}</p>
        </div>
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 10px ${color}` }}
        />
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        <UsageBar icon={<Cpu size={12} />} value={node.cpu} />
        <UsageBar icon={<MemoryStick size={12} />} value={node.ram} />
      </div>
    </article>
  );
};

export const NodesPanel = () => {
  const { data: nodes = [] } = useNodes();
  const activos = nodes.filter((n) => n.estado === "online").length;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#1e2a40] bg-[#111a2b] p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#e6edf6]">
          NODOS MIKROTIK (GNS3)
        </h2>
        <span className="text-[#8b98ad]">⋮</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xl font-extrabold tracking-wide text-[#38bdf8]">
          GNS3
        </span>
        <span className="text-xs font-medium text-[#4ade80]">
          {activos} Activos
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {nodes.map((node) => (
          <NodeCard key={node.id} node={node} />
        ))}
      </div>

      <button className="mt-1 w-full rounded-lg border border-[#1e2a40] bg-[#15203a] px-3 py-2 text-xs font-medium text-[#8b98ad] transition hover:text-white">
        Ver Mapa GNS3 Completo
      </button>
    </div>
  );
};
