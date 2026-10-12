import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNodes } from "../hooks/useNodes";
import type { Node } from "../types/qos";

interface NodeCardProps {
  node: Node;
}

export const NodeCard: React.FC<NodeCardProps> = ({
  node,
}) => {
  return (
    <article className="node-card">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-medium text-white">{node.nombre}</span>
        </div>
        <span className="status-dot bg-emerald-500 rounded-full w-2 h-2" />
      </div>
      <p className="text-xs text-slate-500 font-mono">{node.ip}</p>
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 border-t border-slate-800/60 pt-1">
        <div>CPU: <span className="font-medium text-white">{node.cpu}%</span></div>
        <div>RAM: <span className="font-medium text-white">{node.ram}%</span></div>
      </div>
    </article>
  );
};

export const NodesPanel: React.FC = () => {
  const { data: nodes } = useNodes();

  return (
    <div className="card card-hover">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-white">
          NODOS MIKROTIK (GNS3)
        </h2>
        <span className="text-xs bg-indigo-500/5 border border-indigo-500/10 rounded px-2 py-1 text-slate-400">2 Activos</span>
      </div>

      <div className="space-y-4">
        {nodes?.map((node) => (
          <NodeCard key={node.id} node={node} />
        ))}
      </div>

      <button className="w-full px-3 py-2 bg-card-hover border border-slate-600/50 rounded-xl text-xs font-medium text-slate-400 hover:border-slate-600/70 transition">
        Ver Mapa GNS3 Completo
      </button>
    </div>
  );
};