import { useQuery } from "@tanstack/react-query";
import dashboardService from "../services/dashboardService";

export const useDashboardStats = (params = {}, options = {}) => {
  return useQuery({
    queryKey: ["dashboardStats", params],
    queryFn: () => dashboardService.getStats(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};
