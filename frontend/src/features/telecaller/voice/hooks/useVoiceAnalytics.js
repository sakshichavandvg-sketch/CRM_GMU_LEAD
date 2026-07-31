import { useMemo } from "react";
import { useCallHistory } from "./useCallHistory";
import { computeVoiceAnalytics } from "../../utils/telecallerMetrics";

/**
 * Computes voice analytics from the telecaller's call history.
 * All metrics are derived client-side from TelecallerInteraction records.
 * No separate backend endpoint needed.
 */
export function useVoiceAnalytics() {
  const { data: calls, isLoading, isError } = useCallHistory();

  const analytics = useMemo(() => {
    return computeVoiceAnalytics(calls);
  }, [calls]);

  return { analytics, isLoading, isError };
}
