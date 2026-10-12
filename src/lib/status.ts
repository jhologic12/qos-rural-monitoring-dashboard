import { umbrales } from "./constants";

export function getStatus(
  latencia: number,
  jitter: number,
  perdidaPaquetes: number
): "optimo" | "degradado" | "critico" {
  if (latencia >= umbrales.latenciaCritico || jitter >= umbrales.jitterCritico || perdidaPaquetes >= 5) {
    return "critico";
  }
  if (latencia >= umbrales.latenciaPrecaucion || jitter >= umbrales.jitterPrecaucion) {
    return "degradado";
  }
  return "optimo";
}