import { useQuery } from "@tanstack/react-query";
import { telecallerLeadService } from "../services/telecallerLeadService";

export const useTelecallerLeadNotes = (enquiryNo) => {
  return useQuery({
    queryKey: ["telecaller", "leads", enquiryNo, "notes"],
    queryFn: async () => {
      return await telecallerLeadService.getLeadNotes(enquiryNo);
    },
    enabled: !!enquiryNo,
    staleTime: 5 * 60 * 1000,
  });
};
