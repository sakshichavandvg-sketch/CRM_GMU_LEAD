import { useQuery } from "@tanstack/react-query";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

export const useLeadDetails = (enquiryNo) => {
  return useQuery({
    queryKey: LEAD_KEYS.detail(enquiryNo),
    queryFn: () => leadService.getLeadDetails(enquiryNo),
    enabled: !!enquiryNo,
  });
};
