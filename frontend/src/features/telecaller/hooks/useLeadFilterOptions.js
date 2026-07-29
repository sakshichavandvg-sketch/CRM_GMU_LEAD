import { useQuery } from "@tanstack/react-query";
import { telecallerLeadService } from "../services/telecallerLeadService";

export const useLeadFilterOptions = () => {
  return useQuery({
    queryKey: ["telecaller", "leads", "filterOptions"],
    queryFn: async () => {
      return await telecallerLeadService.getFilterOptions();
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};
