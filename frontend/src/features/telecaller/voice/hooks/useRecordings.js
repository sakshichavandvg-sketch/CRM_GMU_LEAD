import { useMemo } from "react";
import { useCallHistory } from "./useCallHistory";

/**
 * Filters call history to only return interactions that have a valid recordingUrl.
 */
export function useRecordings() {
  const { data: calls, isLoading, isError } = useCallHistory();

  const recordings = useMemo(() => {
    if (!calls || calls.length === 0) return [];

    return calls
      .filter((c) => c.recordingUrl && c.recordingUrl.trim() !== "")
      .map((c) => {
        const callId = c.id || c.interactionId;
        return {
          id: callId,
          leadName: c.leadName || c.name || "Unknown",
          phone: c.phone || c.leadPhone || "--",
          enquiryNo: c.enquiryNo,
          duration: c.callDuration || c.duration || 0,
          recordingUrl: `/api/leads/telecaller/calls/${callId}/recording`,
          date: c.callDateTime || c.createdAt || c.date,
          outcome: c.callOutcome || c.outcome || "Unknown",
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [calls]);

  return { recordings, isLoading, isError };
}
