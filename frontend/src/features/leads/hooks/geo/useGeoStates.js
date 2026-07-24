import { useQuery } from "@tanstack/react-query";
import leadService from "../../services/leadService";
import { LEAD_KEYS } from "../../constants/queryKeys";

export const useGeoStates = () => {
  return useQuery({
    queryKey: LEAD_KEYS.geoStates(),
    queryFn: leadService.getGeoStates,
    staleTime: Infinity, // Cache aggressively, states rarely change
  });
};
