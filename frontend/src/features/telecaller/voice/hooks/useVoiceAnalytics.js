import { useMemo } from "react";
import { useCallHistory } from "./useCallHistory";

/**
 * Computes voice analytics from the telecaller's call history.
 * All metrics are derived client-side from TelecallerInteraction records.
 * No separate backend endpoint needed.
 */
export function useVoiceAnalytics() {
  const { data: calls, isLoading, isError } = useCallHistory();

  const analytics = useMemo(() => {
    if (!calls || calls.length === 0) {
      return {
        // Today counts
        callsToday: 0,
        connected: 0,
        busy: 0,
        noResponse: 0,
        cancelled: 0,
        // Duration
        avgDuration: 0,
        totalDuration: 0,
        longestCall: 0,
        shortestCall: 0,
        avgTalkTime: 0,
        // Rates
        connectionRate: 0,
        busyRate: 0,
        successRate: 0,
        recordingRate: 0,
        // New
        avgRingTime: 0,
      };
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const todayCalls = calls.filter((c) => {
      const callDate = new Date(c.callDateTime || c.createdAt || c.date);
      return callDate >= todayStart;
    });

    const total = todayCalls.length;

    const connectedCalls = todayCalls.filter(
      (c) => (c.callOutcome || c.outcome || "").toLowerCase() === "connected"
    );

    const busyCalls = todayCalls.filter(
      (c) => (c.callOutcome || c.outcome || "").toLowerCase() === "busy"
    );

    const noResponseCalls = todayCalls.filter((c) => {
      const outcome = (c.callOutcome || c.outcome || "").toLowerCase();
      return (
        outcome === "no response" ||
        outcome === "no_response" ||
        outcome === "no answer"
      );
    });

    const cancelledCalls = todayCalls.filter(
      (c) => (c.callOutcome || c.outcome || "").toLowerCase() === "cancelled"
    );

    const connected = connectedCalls.length;
    const busy = busyCalls.length;
    const noResponse = noResponseCalls.length;
    const cancelled = cancelledCalls.length;

    // ── Duration calculations (all calls, seconds) ──────────────────────────
    const allDurations = todayCalls
      .map((c) => c.callDuration || c.duration || 0)
      .filter((d) => d > 0);

    const totalDuration = allDurations.reduce((sum, d) => sum + d, 0);
    const avgDuration =
      allDurations.length > 0
        ? Math.round(totalDuration / allDurations.length)
        : 0;
    const longestCall = allDurations.length > 0 ? Math.max(...allDurations) : 0;
    const shortestCall =
      allDurations.length > 0 ? Math.min(...allDurations) : 0;

    // ── Avg Talk Time — connected calls only ──────────────────────────────────
    const connectedDurations = connectedCalls
      .map((c) => c.callDuration || c.duration || 0)
      .filter((d) => d > 0);
    const avgTalkTime =
      connectedDurations.length > 0
        ? Math.round(
            connectedDurations.reduce((s, d) => s + d, 0) /
              connectedDurations.length
          )
        : 0;

    // ── Avg Ring Time — proxy from busy/no-answer calls ───────────────────────
    const unansweredDurations = [...busyCalls, ...noResponseCalls]
      .map((c) => c.callDuration || c.duration || 0)
      .filter((d) => d > 0);
    const avgRingTime =
      unansweredDurations.length > 0
        ? Math.round(
            unansweredDurations.reduce((s, d) => s + d, 0) /
              unansweredDurations.length
          )
        : 0;

    // ── Rates ─────────────────────────────────────────────────────────────────
    const connectionRate =
      total > 0 ? Math.round((connected / total) * 100) : 0;
    const busyRate = total > 0 ? Math.round((busy / total) * 100) : 0;
    const successRate = connectionRate;

    // Recording rate — calls that have a recordingUrl
    const recordingCount = todayCalls.filter(
      (c) => c.recordingUrl && c.recordingUrl.trim() !== ""
    ).length;
    const recordingRate =
      total > 0 ? Math.round((recordingCount / total) * 100) : 0;

    return {
      callsToday: total,
      connected,
      busy,
      noResponse,
      cancelled,
      avgDuration,
      totalDuration,
      longestCall,
      shortestCall,
      avgTalkTime,
      avgRingTime,
      connectionRate,
      busyRate,
      successRate,
      recordingRate,
    };
  }, [calls]);

  return { analytics, isLoading, isError };
}
