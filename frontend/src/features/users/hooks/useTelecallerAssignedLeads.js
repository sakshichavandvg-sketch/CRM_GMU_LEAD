"use client";

import { useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEYS } from "@/features/users/constants/queryKeys";
import telecallerService from "@/features/users/services/telecallerService";

export default function useTelecallerAssignedLeads(empId, filters = {}) {
  return useQuery({
    queryKey: USER_QUERY_KEYS.telecallerLeads(empId, filters),
    queryFn: () => telecallerService.getTelecallerLeads(empId, filters),
    enabled: !!empId,
    placeholderData: (previousData) => previousData, // keepPreviousData replacement in v5 to prevent flickering
  });
}
