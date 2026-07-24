import { useQuery } from "@tanstack/react-query";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

export const useLeadTimeline = (leadId) => {
  return useQuery({
    queryKey: LEAD_KEYS.timeline(leadId),
    queryFn: () => leadService.getLeadTimeline(leadId),
    enabled: !!leadId,
  });
};
