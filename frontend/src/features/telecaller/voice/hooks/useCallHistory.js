import { useQuery } from "@tanstack/react-query";
import { callHistoryService } from "../services/callHistoryService";

export function useCallHistory() {
  return useQuery({
    queryKey: ["telecaller-calls"],
    queryFn: callHistoryService.getCallHistory,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
}
