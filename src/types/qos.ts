export interface TimePoint {
  hora: string;
  latencia: number;
  jitter: number;
  perdidaPaquetes: number;
}

export interface Metric {
  id: string;
  timestamp: string;
  latencia: number;
  jitter: number;
  perdidaPaquetes: number;
}

export interface Node {
  id: string;
  nombre: string;
  ip: string;
  cpu: number;
  ram: number;
  estado: "online" | "offline" | "degradado";
}

export interface QosEvent {
  id: string;
  fechaHora: string;
  nodo: string;
  tipo: "latencia" | "jitter" | "perdida" | "sistema";
  descripcion: string;
  estado: "optimo" | "degradado" | "critico" | "info";
}

// Alias por compatibilidad con archivos que ya lo importan
export type QosEventType = QosEvent;

export interface EventsPage {
  events: QosEvent[];
  total: number;
  paginas: number;
}

export const Status = {
  Optimo: "optimo",
  Degradado: "degradado",
  Critico: "critico",
} as const;

export type Status = (typeof Status)[keyof typeof Status];