"use client";

import { useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "@/features/users/constants/queryKeys";
import telecallerService from "@/features/users/services/telecallerService";

export default function useTelecallerDashboard(empId) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.telecallerDashboard(empId),
    queryFn: () => telecallerService.getTelecallerDashboard(empId),
    enabled: !!empId,
    staleTime: 5 * 60 * 1000, // Cache aggressively as requested
  });
}
