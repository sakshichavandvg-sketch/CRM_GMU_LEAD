import { useQuery } from "@tanstack/react-query";
import reportsService from "../services/reportsService";

export const useTelecallers = (options = {}) => {
  return useQuery({
    queryKey: ["telecallers"],
    queryFn: reportsService.getTelecallers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};
