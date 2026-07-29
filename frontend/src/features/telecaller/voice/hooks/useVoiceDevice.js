import { useEffect, useRef } from "react";
import { voiceManager } from "../utils/VoiceManager";
import { useVoicePermissions } from "./useVoicePermissions";
import { PERMISSION_STATES } from "../utils/twilioEvents";

export function useVoiceDevice() {
  const initialized = useRef(false);
  const { permission, requestPermission } = useVoicePermissions();

  useEffect(() => {
    // Only initialize once and only if we have microphone permission or we are ready to ask for it.
    // It's better to wait until user interacts to request permission in some browsers, 
    // but Telecaller dashboard implies they should grant it.
    const initDevice = async () => {
      if (initialized.current) return;
      
      let currentPerm = permission;
      if (currentPerm === PERMISSION_STATES.UNKNOWN || currentPerm === PERMISSION_STATES.PROMPT) {
        // Will prompt the user
        const granted = await requestPermission();
        if (!granted) {
          console.warn("Microphone permission denied or unavailable (possibly due to insecure HTTP context like an IP address). Proceeding with Twilio initialization anyway for testing.");
        }
      } else if (currentPerm === PERMISSION_STATES.DENIED) {
        console.warn("Microphone permission previously denied. Proceeding with Twilio initialization anyway for testing.");
      }

      initialized.current = true;
      await voiceManager.initialize();
    };

    initDevice();

    // Cleanup on unmount/refresh
    const handleBeforeUnload = () => {
      voiceManager.destroy();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [permission, requestPermission]);

  return { 
    isInitialized: initialized.current,
    disconnectAll: () => voiceManager.disconnectAll() 
  };
}
