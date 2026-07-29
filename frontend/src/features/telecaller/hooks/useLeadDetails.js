import { useQuery } from "@tanstack/react-query";
import { telecallerLeadService } from "../services/telecallerLeadService";
import { mapLeadDetail } from "../mappers/telecallerViewModelMapper";

export const useLeadDetails = (enquiryNo) => {
  return useQuery({
    queryKey: ["telecaller", "lead", enquiryNo],
    queryFn: async () => {
      const rawData = await telecallerLeadService.getLeadDetails(enquiryNo);
      return mapLeadDetail(rawData);
    },
    enabled: !!enquiryNo, // Only run the query if enquiryNo is defined
    retry: (failureCount, error) => {
      // Do not retry on 403 Forbidden or 404 Not Found
      if (error?.response?.status === 403 || error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    }
  });
};
