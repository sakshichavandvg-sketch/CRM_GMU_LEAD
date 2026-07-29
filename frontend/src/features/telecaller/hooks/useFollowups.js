import { useQuery } from "@tanstack/react-query";
import { telecallerFollowupService } from "../services/telecallerFollowupService";

export const useFollowups = (tab = "today", filters = {}) => {
  return useQuery({
    queryKey: ["followups", tab, filters],
    queryFn: async () => {
      return await telecallerFollowupService.getFollowups({ tab, ...filters });
    },
    staleTime: 5 * 60 * 1000,
  });
};
