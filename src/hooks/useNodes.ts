import { useQuery } from "@tanstack/react-query";
import { getNodes } from "../services/qosApi";
import type { Node } from "../types/qos";

export function useNodes() {
  return useQuery<Node[], Error>({
    queryKey: ["nodes"],
    queryFn: getNodes,
    staleTime: 5000,
    initialData: [] as Node[],
  });
}