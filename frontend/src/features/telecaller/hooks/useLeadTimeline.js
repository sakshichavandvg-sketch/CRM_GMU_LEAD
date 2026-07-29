import { useQuery } from "@tanstack/react-query";
import { telecallerLeadService } from "../services/telecallerLeadService";

export const useLeadTimeline = (enquiryNo) => {
  return useQuery({
    queryKey: ["telecaller", "timeline", enquiryNo],
    queryFn: async () => {
      return await telecallerLeadService.getLeadTimeline(enquiryNo);
    },
    enabled: !!enquiryNo,
    staleTime: 5 * 60 * 1000,
  });
};
