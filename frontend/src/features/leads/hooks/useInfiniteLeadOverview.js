import { useInfiniteQuery } from "@tanstack/react-query";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

/**
 * @deprecated This hook is being phased out for table views in favor of server-side pagination 
 * via `useLeadOverview.js`. It should be retained for future Board Views or mobile infinite scrolling if needed.
 */
export const useInfiniteLeadOverview = (filters, options = {}) => {
  // Strip empty filters to keep URL clean and cache keys predictable
  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
  );

  const queryFn = ({ pageParam = 0 }) => leadService.getOverviewLeads({ ...activeFilters, page: pageParam, size: filters.size || 10 });

  return useInfiniteQuery({
    queryKey: [...LEAD_KEYS.overview(activeFilters), "infinite"],
    queryFn,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.currentPage ?? lastPage.page?.number ?? 0;
      const totalPages = lastPage.totalPages ?? lastPage.page?.totalPages ?? 1;

      if (currentPage < totalPages - 1) {
        return currentPage + 1;
      }
      return undefined;
    },
    enabled: options.enabled !== undefined ? options.enabled : true,
  });
};
