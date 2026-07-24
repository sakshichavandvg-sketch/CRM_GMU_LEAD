import { useQuery } from "@tanstack/react-query";
import leadService from "../../services/leadService";
import { LEAD_KEYS } from "../../constants/queryKeys";

export const useGeoTaluks = (district) => {
  return useQuery({
    queryKey: LEAD_KEYS.geoTaluks(district),
    queryFn: () => leadService.getGeoTaluks(district),
    enabled: !!district,
    staleTime: Infinity,
  });
};
