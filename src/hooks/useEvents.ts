import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../services/qosApi";
import type { QosEvent } from "../types/qos";

export function useEvents(
  page: number = 1,
  pageSize: number = 10
) {
  return useQuery<{
    events: QosEvent[];
    total: number;
    paginas: number;
  }, Error>({
    queryKey: ["events", page, pageSize],
    queryFn: () => getEvents(page, pageSize),
    staleTime: 1000,
    refetchInterval: false,
    initialData: { events: [], total: 0, paginas: 1 },
  });
}