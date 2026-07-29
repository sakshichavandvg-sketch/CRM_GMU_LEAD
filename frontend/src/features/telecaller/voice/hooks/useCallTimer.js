import { useState, useEffect } from "react";
import { VOICE_STATES } from "../utils/twilioEvents";

export function useCallTimer(voiceState) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval = null;

    if (voiceState === VOICE_STATES.CONNECTED) {
      interval = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } else if (voiceState === VOICE_STATES.DISCONNECTED || voiceState === VOICE_STATES.FAILED || voiceState === VOICE_STATES.READY) {
      if (interval) clearInterval(interval);
      // We don't reset immediately so the final time can be seen briefly if needed,
      // but typical UI would hide the timer.
      // We reset when state goes to IDLE or when a new call starts (CONNECTING)
    }

    if (voiceState === VOICE_STATES.CONNECTING) {
      setElapsed(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [voiceState]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return { formattedTime: formatTime(elapsed), elapsedSeconds: elapsed };
}
