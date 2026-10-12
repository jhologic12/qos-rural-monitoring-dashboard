import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "../services/qosApi";
import type { Metric } from "../types/qos";

export function useMetrics() {
  return useQuery<Metric[], Error>({
    queryKey: ["metrics"],
    queryFn: getMetrics,
    staleTime: 2000,
    refetchInterval: false,
    initialData: [] as Metric[],
  });
}