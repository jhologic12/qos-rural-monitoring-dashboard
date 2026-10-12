import { useQuery } from "@tanstack/react-query";
import { getTimeSeries } from "../services/qosApi";
import type { TimePoint } from "../types/qos";

export function useTimeSeries(horas: number = 24) {
  return useQuery<TimePoint[], Error>({
    queryKey: ["timeSeries", horas],
    queryFn: () => getTimeSeries(horas),
    refetchInterval: 2500,
  });
}