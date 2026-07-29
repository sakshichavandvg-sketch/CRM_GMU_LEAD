import { useQuery } from "@tanstack/react-query";
import { telecallerDashboardService } from "../services/telecallerDashboardService";
import { mapDashboard } from "../mappers/telecallerViewModelMapper";

export const useTelecallerDashboard = () => {
  return useQuery({
    queryKey: ["telecallerDashboard"],
    queryFn: async () => {
      const rawData = await telecallerDashboardService.getDashboard();
      return mapDashboard(rawData);
    },
    staleTime: 5 * 60 * 1000,
  });
};
