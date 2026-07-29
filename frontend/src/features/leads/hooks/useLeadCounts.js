import { useQuery } from "@tanstack/react-query";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

export function useLeadCounts() {
  return useQuery({
    queryKey: LEAD_KEYS.counts(),
    queryFn: async () => {
      const data = await leadService.getLeadCounts();
      return mapLeadCounts(data);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}

function mapLeadCounts(data) {
  if (!data) return {};
  
  // Handle both direct counts and dashboard stats format
  const stats = data.overall || data;
  
  return {
    all: stats.total || stats.all || 0,
    hot: stats.hot || 0,
    cold: stats.cold || 0,
    alloted: stats.alloted || stats.allotted || 0,
    "not-alloted": stats.notAlloted || stats.not_allotted || stats["not-alloted"] || 0,
    "not-consulted": stats.notConsulted || stats.not_consulted || stats["not-consulted"] || 0,
    "opinion-reassign": stats.opinionReassign || stats.opinion_reassign || stats["opinion-reassign"] || 0,
  };
}
