import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useEvents } from "../hooks/useEvents";
import type { QosEvent } from "../types/qos";

interface EventsTableProps {
  page?: number;
  pageSize?: number;
}

export const EventsTable: React.FC<EventsTableProps> = ({
  page = 1,
  pageSize = 5,
}) => {
  const { data, isLoading } = useEvents(page, pageSize);

  if (isLoading) {
    return (
      <div className="h-64 w-full bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
        Cargando...
      </div>
    );
  }

  const eventos = data?.events || [];
  const total = data?.total || 0;
  const totalPaginas = data?.paginas || 1;
  const inicio = (page - 1) * pageSize + 1;
  const fin = Math.min(inicio + pageSize - 1, total);

  const estadoClass = (estado: string) => {
    switch (estado) {
      case "optimo":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "degradado":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "critico":
        return "bg-critical/10 text-critical border-critical/50";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const estadoTexto = (estado: string) => {
    switch (estado) {
      case "optimo":
        return "Óptimo (Verde)";
      case "degradado":
        return "Degradado (Amarillo)";
      case "critico":
        return "Crítico (Rojo)";
      default:
        return estado;
    }
  };

  const tipoIcono = (tipo: string) => {
    switch (tipo) {
      case "latencia":
        return "⚡";
      case "jitter":
        return "📡";
      case "perdida":
        return "📦";
      case "sistema":
        return "🔧";
      default:
        return "📝";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] font-semibold">
          <tr>
            <th className="p-3 rounded-l-lg">FECHA/HORA</th>
            <th className="p-3">NODO</th>
            <th className="p-3">TIPO DE EVENTO</th>
            <th className="p-3">DESCRIPCIÓN</th>
            <th className="p-3 rounded-r-lg">ESTADO</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {eventos.length === 0 ? (
            <tr>
              <td className="p-3" colSpan={5} className="text-center text-slate-500">
                No hay eventos registrados
              </td>
            </tr>
          ) : (
            eventos.map((evento) => (
              <tr key={evento.id} className="hover:bg-slate-800/30 transition">
                <td className="p-3 font-mono text-slate-400">
                  {evento.fechaHora}
                </td>
                <td className="p-3 font-medium text-white">
                  {evento.nodo}
                </td>
                <td className="p-3">
                  {tipoIcono(evento.tipo)} {evento.tipo}
                </td>
                <td className="p-3 text-slate-300">
                  {evento.descripcion}
                </td>
                <td className="p-3">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold",
                      estadoClass(evento.estado),
                    )}
                  >
                    {estadoTexto(evento.estado)}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};