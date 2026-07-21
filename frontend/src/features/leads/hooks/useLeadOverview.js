import { useQuery } from "@tanstack/react-query";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

export const useLeadOverview = (filters, options = {}) => {
  // Strip empty filters to keep URL clean and cache keys predictable
  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
  );

  return useQuery({
    queryKey: LEAD_KEYS.overview(activeFilters),
    queryFn: () => leadService.getOverviewLeads(activeFilters),
    keepPreviousData: true,
    enabled: options.enabled !== undefined ? options.enabled : true,
  });
};
