import type { Metric, Node, QosEvent, TimePoint } from "../types/qos";

const MINUTO = 60_000;
const PUNTOS = 300; // 5 horas, un punto por minuto

const pad = (n: number) => String(n).padStart(2, "0");
const redondear = (n: number) => Math.round(n * 10) / 10;

const horaCorta = (t: number) => {
  const d = new Date(t);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const fechaCompleta = (t: number) => {
  const d = new Date(t);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// ---------- Serie de tiempo ----------
let latActual = 18;
let jitActual = 2.5;

function siguienteLectura(t: number): TimePoint {
  // caminata aleatoria que vuelve a ~18 ms / ~2.5 ms
  latActual += (18 - latActual) * 0.12 + (Math.random() - 0.5) * 3;
  jitActual += (2.5 - jitActual) * 0.15 + (Math.random() - 0.5);
  latActual = Math.min(30, Math.max(12, latActual));
  jitActual = Math.min(4.5, Math.max(1, jitActual));
  return {
    hora: horaCorta(t),
    latencia: redondear(latActual),
    jitter: redondear(jitActual),
    perdidaPaquetes: 0,
  };
}

function construirHistorial(): TimePoint[] {
  const ahora = Date.now();
  const lista: TimePoint[] = [];
  for (let i = PUNTOS - 1; i >= 0; i--) {
    lista.push(siguienteLectura(ahora - i * MINUTO));
  }
  return lista;
}

let puntos: TimePoint[] = construirHistorial();
let ultimoMinuto = Math.floor(Date.now() / MINUTO);

/** Se llama en cada refresco: actualiza la lectura del minuto actual
 *  o agrega un punto nuevo cuando cambia el minuto. */
export function avanzarSerie(): TimePoint[] {
  const ahora = Date.now();
  const minuto = Math.floor(ahora / MINUTO);
  const nuevo = siguienteLectura(ahora);

  if (minuto !== ultimoMinuto) {
    puntos = [...puntos.slice(-(PUNTOS - 1)), nuevo];
    ultimoMinuto = minuto;
  } else {
    puntos = [...puntos.slice(0, -1), nuevo];
  }
  return puntos;
}

export function obtenerPuntosTiempo(): TimePoint[] {
  return [...puntos];
}

// ---------- Métricas ----------
export function obtenerMetricas(): Metric[] {
  return puntos.slice(-12).map((p, i) => ({
    id: `m-${i}`,
    timestamp: p.hora,
    latencia: p.latencia,
    jitter: p.jitter,
    perdidaPaquetes: p.perdidaPaquetes,
  }));
}

// ---------- Nodos ----------
const nodos: Node[] = [
  { id: "r1", nombre: "MikroTik-R1", ip: "192.168.10.1", cpu: 10, ram: 25, estado: "online" },
  { id: "r2", nombre: "MikroTik-R2", ip: "192.168.10.2", cpu: 10, ram: 25, estado: "online" },
];

export function obtenerNodos(): Node[] {
  return nodos;
}

// ---------- Eventos ----------
type Plantilla = Pick<QosEvent, "nodo" | "tipo" | "descripcion" | "estado">;

const plantillas: Plantilla[] = [
  { nodo: "MikroTik-R1", tipo: "latencia", descripcion: "Pico breve de 35ms detectado", estado: "degradado" },
  { nodo: "MikroTik-R2", tipo: "jitter", descripcion: "Variación de jitter menor a 4ms", estado: "info" },
  { nodo: "Sistema", tipo: "sistema", descripcion: "Sistema operativo Óptimo", estado: "optimo" },
];

function construirEventos(): QosEvent[] {
  const lista: QosEvent[] = [
    { id: "evt-1", fechaHora: "15/06/2024 14:12", ...plantillas[0] },
    { id: "evt-2", fechaHora: "15/06/2024 13:50", ...plantillas[1] },
    { id: "evt-3", fechaHora: "15/06/2024 12:30", ...plantillas[2] },
  ];
  const base = new Date(2024, 5, 15, 12, 30).getTime();
  for (let i = 4; i <= 50; i++) {
    lista.push({
      id: `evt-${i}`,
      fechaHora: fechaCompleta(base - (i - 3) * 45 * MINUTO),
      ...plantillas[(i - 1) % 3],
    });
  }
  return lista;
}

const eventos = construirEventos();

export function obtenerEventos(page: number, pageSize: number) {
  const inicio = (page - 1) * pageSize;
  return {
    events: eventos.slice(inicio, inicio + pageSize),
    total: eventos.length,
    paginas: Math.max(1, Math.ceil(eventos.length / pageSize)),
  };
}