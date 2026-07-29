import { useQuery } from "@tanstack/react-query";
import { telecallerLeadService } from "../services/telecallerLeadService";

export const useTelecallerLeadTimeline = (enquiryNo) => {
  return useQuery({
    queryKey: ["telecaller", "leads", enquiryNo, "timeline"],
    queryFn: async () => {
      return await telecallerLeadService.getLeadTimeline(enquiryNo);
    },
    enabled: !!enquiryNo,
    staleTime: 5 * 60 * 1000,
  });
};
