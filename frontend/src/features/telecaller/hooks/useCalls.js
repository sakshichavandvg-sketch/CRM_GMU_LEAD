import { useQuery } from "@tanstack/react-query";
import { telecallerCallService } from "../services/telecallerCallService";

export const useCalls = (filters = {}, page = 0, size = 10) => {
  return useQuery({
    queryKey: ["telecaller", "calls", filters, page, size],
    queryFn: async () => {
      // You can add mapper logic here similar to leads
      return await telecallerCallService.getCalls({ page, size, ...filters });
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useCallDetails = (callId) => {
  return useQuery({
    queryKey: ["telecaller", "call", callId],
    queryFn: async () => {
      return await telecallerCallService.getCallDetails(callId);
    },
    enabled: !!callId,
    staleTime: 5 * 60 * 1000,
  });
};
