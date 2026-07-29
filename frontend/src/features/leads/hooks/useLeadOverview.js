import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

export const useLeadOverview = ({ filters = {}, page = 0, size = 10, sort }, options = {}) => {
  const queryClient = useQueryClient();

  // Strip empty filters to keep URL clean and cache keys predictable
  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
  );

  const queryParams = { ...activeFilters, page, size, sort };
  const queryKey = [...LEAD_KEYS.overview(activeFilters), page, size, sort];

  const fetchLeads = async (params, targetPage) => {
    const response = await leadService.getOverviewLeads(params);
    // Normalize backend metadata
    return {
      leads: response.leads || response.content || response.data || (Array.isArray(response) ? response : []),
      currentPage: response.currentPage ?? response.page?.number ?? response.pageNumber ?? targetPage,
      totalPages: response.totalPages ?? response.page?.totalPages ?? 1,
      totalItems: response.totalItems ?? response.totalElements ?? response.page?.totalElements ?? 0,
      pageSize: response.pageSize ?? response.size ?? response.page?.size ?? size,
    };
  };

  const query = useQuery({
    queryKey,
    queryFn: () => fetchLeads(queryParams, page),
    keepPreviousData: true,
    enabled: options.enabled !== undefined ? options.enabled : true,
  });

  // Prefetch next page
  useEffect(() => {
    if (query.data && query.data.currentPage < query.data.totalPages - 1) {
      const nextPage = query.data.currentPage + 1;
      const nextParams = { ...queryParams, page: nextPage };
      const nextKey = [...LEAD_KEYS.overview(activeFilters), nextPage, size, sort];

      queryClient.prefetchQuery({
        queryKey: nextKey,
        queryFn: () => fetchLeads(nextParams, nextPage),
      });
    }
  }, [query.data, queryClient, activeFilters, page, size, sort]);

  return query;
};
