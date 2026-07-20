import { useQuery } from "@tanstack/react-query";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

export const useLeadFilterOptions = () => {
  return useQuery({
    queryKey: LEAD_KEYS.filterOptions(),
    queryFn: leadService.getFilterOptions,
    staleTime: 5 * 60 * 1000, // Cache for 5 mins as filter options rarely change frequently
  });
};
