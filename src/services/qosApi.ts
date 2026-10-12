import type { Metric, Node, TimePoint } from "../types/qos";
import {
  avanzarSerie,
  obtenerEventos,
  obtenerMetricas,
  obtenerNodos,
} from "../mocks/data";

// Mock activo salvo que VITE_USE_MOCK=false en el archivo .env
const USAR_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

async function http<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getTimeSeries(horas: number = 24): Promise<TimePoint[]> {
  if (USAR_MOCK) return avanzarSerie();
  return http<TimePoint[]>(`/api/qos/timeseries?horas=${horas}`);
}

export async function getMetrics(): Promise<Metric[]> {
  if (USAR_MOCK) return obtenerMetricas();
  return http<Metric[]>("/api/qos/metrics");
}

export async function getNodes(): Promise<Node[]> {
  if (USAR_MOCK) return obtenerNodos();
  return http<Node[]>("/api/qos/nodes");
}

export async function getEvents(
  page: number = 1,
  pageSize: number = 10,
): Promise<ReturnType<typeof obtenerEventos>> {
  if (USAR_MOCK) return obtenerEventos(page, pageSize);
  return http(`/api/qos/events?page=${page}&pageSize=${pageSize}`);
}