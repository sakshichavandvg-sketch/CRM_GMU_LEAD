import { useQuery } from "@tanstack/react-query";
import callReportsService from "../services/callReportsService";

/**
 * Fetches the telecaller performance summary table.
 * Used by: TelecallerPerformanceTable (Admin)
 */
export const useCallReportsSummary = (filters = {}, page = 0, size = 10) => {
  return useQuery({
    queryKey: ["callReports", "performance", filters, page, size],
    queryFn: () =>
      callReportsService.getTelecallerPerformance({ page, size, ...filters }),
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Fetches paginated call logs for a specific telecaller.
 * Used by: CallLogsTable (Admin → TelecallerCallLogsPage)
 */
export const useTelecallerCallLogs = (userId, filters = {}, page = 0, size = 10) => {
  return useQuery({
    queryKey: ["callReports", "logs", userId, filters, page, size],
    queryFn: () =>
      callReportsService.getTelecallerCallLogs(userId, { page, size, ...filters }),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
