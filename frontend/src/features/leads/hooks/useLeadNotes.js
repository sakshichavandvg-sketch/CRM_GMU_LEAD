import { useQuery } from "@tanstack/react-query";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

export const useLeadNotes = (leadId) => {
  return useQuery({
    queryKey: LEAD_KEYS.notes(leadId),
    queryFn: () => leadService.getLeadNotes(leadId),
    enabled: !!leadId,
  });
};
