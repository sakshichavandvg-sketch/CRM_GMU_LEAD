import { useQuery } from "@tanstack/react-query";
import leadService from "../../services/leadService";
import { LEAD_KEYS } from "../../constants/queryKeys";

export const useGeoDistricts = (state) => {
  return useQuery({
    queryKey: LEAD_KEYS.geoDistricts(state),
    queryFn: () => leadService.getGeoDistricts(state),
    enabled: !!state,
    staleTime: Infinity,
  });
};
