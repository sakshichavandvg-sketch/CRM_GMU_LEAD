import { useQuery } from "@tanstack/react-query";
import { callHistoryService } from "../services/callHistoryService";

/**
 * Hook to fetch a specific recording by interaction ID.
 * @param {string|number} interactionId - The interaction ID to fetch the recording for.
 */
export function useRecording(interactionId) {
  return useQuery({
    queryKey: ["recording", interactionId],
    queryFn: () => callHistoryService.getRecording(interactionId),
    enabled: !!interactionId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Don't retry too many times if recording doesn't exist
  });
}
