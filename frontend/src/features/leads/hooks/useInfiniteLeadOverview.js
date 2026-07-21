import { useInfiniteQuery } from "@tanstack/react-query";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

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
