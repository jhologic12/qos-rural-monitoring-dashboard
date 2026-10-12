import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEvents } from "../hooks/useEvents";

interface EventsTableProps {
  page?: number; // página inicial
  pageSize?: number;
}

const ESTADO_UI: Record<string, { texto: string; color: string }> = {
  optimo: { texto: "Óptimo (Verde)", color: "#4ade80" },
  degradado: { texto: "Precaución (Amarillo)", color: "#facc15" },
  critico: { texto: "Crítico (Rojo)", color: "#ef4444" },
  info: { texto: "Información (Azul)", color: "#38bdf8" },
};

const TIPO_TEXTO: Record<string, string> = {
  latencia: "Latencia",
  jitter: "Jitter",
  perdida: "Pérdida",
  sistema: "Estado",
};

export const EventsTable = ({
  page: initialPage = 1,
  pageSize = 5,
}: EventsTableProps) => {
  const [page, setPage] = useState(initialPage);
  const { data, isLoading } = useEvents(page, pageSize);

  const eventos = data?.events ?? [];
  const total = data?.total ?? 0;
  const totalPaginas = data?.paginas ?? 1;
  const inicio = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const fin = Math.min(page * pageSize, total);

  return (
    <div className="rounded-xl border border-[#1e2a40] bg-[#111a2b] p-4">
      <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#e6edf6]">
        HISTÓRICO DE EVENTOS QoS
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-xs text-[#cbd5e1]">
          <thead>
            <tr className="bg-[#0d1524] text-[11px] uppercase tracking-wider text-[#8b98ad]">
              <th className="p-2.5 font-semibold">FECHA/HORA</th>
              <th className="p-2.5 font-semibold">NODO</th>
              <th className="p-2.5 font-semibold">TIPO DE EVENTO</th>
              <th className="p-2.5 font-semibold">DESCRIPCIÓN</th>
              <th className="p-2.5 font-semibold">ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-[#8b98ad]">
                  Cargando...
                </td>
              </tr>
            ) : eventos.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-[#8b98ad]">
                  No hay eventos registrados
                </td>
              </tr>
            ) : (
              eventos.map((e) => {
                const ui = ESTADO_UI[e.estado] ?? {
                  texto: e.estado,
                  color: "#8b98ad",
                };
                return (
                  <tr
                    key={e.id}
                    className="border-t border-[#1e2a40] hover:bg-[#15203a]"
                  >
                    <td className="p-2.5">{e.fechaHora}</td>
                    <td className="p-2.5">{e.nodo}</td>
                    <td className="p-2.5">{TIPO_TEXTO[e.tipo] ?? e.tipo}</td>
                    <td className="p-2.5">{e.descripcion}</td>
                    <td
                      className="p-2.5 font-medium"
                      style={{ color: ui.color }}
                    >
                      {ui.texto}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-end gap-3 text-xs text-[#8b98ad]">
        <span>
          {inicio}-{fin} de {total}
        </span>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="rounded bg-[#15203a] p-1 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPaginas, p + 1))}
          disabled={page >= totalPaginas}
          className="rounded bg-[#15203a] p-1 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
