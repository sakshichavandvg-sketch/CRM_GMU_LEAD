import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { voiceManager } from "../utils/VoiceManager";
import { VOICE_STATES } from "../utils/twilioEvents";

export function useVoiceCall(voiceState, setErrorMsg) {
  const queryClient = useQueryClient();

  const startCall = useCallback(
    async (enquiryNo, to) => {
      if (
        voiceState === VOICE_STATES.CONNECTING ||
        voiceState === VOICE_STATES.CONNECTED ||
        voiceState === VOICE_STATES.RINGING
      ) {
        setErrorMsg("Finish current call first.");
        return;
      }

      if (voiceState !== VOICE_STATES.READY) {
        setErrorMsg("Device is not ready to make calls.");
        return;
      }

      try {
        await voiceManager.connect({ To: to, enquiryNo });
      } catch (error) {
        console.warn("Call failed to start:", error?.message || error);
        setErrorMsg("Failed to connect call.");
      }
    },
    [voiceState, setErrorMsg]
  );

  const endCall = useCallback(() => {
    voiceManager.disconnectAll();
  }, []);

  const muteCall = useCallback((shouldMute) => {
    voiceManager.mute(shouldMute);
  }, []);

  const sendDigits = useCallback((digits) => {
    voiceManager.sendDigits(digits);
  }, []);

  /**
   * Invalidates ALL React Query caches that depend on call/interaction data.
   * Called after a call disconnects so that Twilio's status-callback and
   * recording-callback webhooks have updated the backend, and the frontend
   * refreshes automatically.
   */
  const handleCallDisconnect = useCallback(() => {
    const invalidateAll = () => {
      // Legacy flat keys
      const flatKeys = [
        "telecaller-dashboard",
        "telecaller-calls",
        "lead-details",
        "recent-activity",
        "pipeline",
        "followups",
        "performance",
        "voice-analytics",
        "telecaller-recordings",
      ];

      flatKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });

      // Namespaced array keys
      const namespacedKeys = [
        ["telecaller", "calls"],
        ["telecaller", "leads"],
        ["telecaller-dashboard"],
      ];

      namespacedKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });

      // Invalidate all timeline queries
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) &&
          query.queryKey[0] === "telecaller" &&
          query.queryKey[1] === "timeline",
      });
    };

    // Invalidate immediately to show call ended
    invalidateAll();

    // Staggered invalidations to catch delayed Twilio webhooks (status callbacks, recordings)
    // Twilio often takes a few seconds to process recordings and send the payload.
    const delays = [3000, 8000, 15000, 30000];
    delays.forEach(delay => {
      setTimeout(() => {
        invalidateAll();
      }, delay);
    });

  }, [queryClient]);

  return { startCall, endCall, muteCall, sendDigits, handleCallDisconnect };
}
