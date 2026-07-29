import { useState, useEffect } from "react";
import { PERMISSION_STATES } from "../utils/twilioEvents";

export function useVoicePermissions() {
  const [permission, setPermission] = useState(PERMISSION_STATES.UNKNOWN);

  useEffect(() => {
    // Check initial permission state if browser supports it
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "microphone" }).then((result) => {
        if (result.state === "granted") setPermission(PERMISSION_STATES.GRANTED);
        else if (result.state === "denied") setPermission(PERMISSION_STATES.DENIED);
        else setPermission(PERMISSION_STATES.PROMPT);

        result.onchange = () => {
          if (result.state === "granted") setPermission(PERMISSION_STATES.GRANTED);
          else if (result.state === "denied") setPermission(PERMISSION_STATES.DENIED);
          else setPermission(PERMISSION_STATES.PROMPT);
        };
      }).catch(() => {
        // Fallback for browsers that don't support permissions.query for microphone
        setPermission(PERMISSION_STATES.PROMPT);
      });
    } else {
      setPermission(PERMISSION_STATES.PROMPT);
    }
  }, []);

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermission(PERMISSION_STATES.GRANTED);
      // Immediately stop the stream since we just wanted permission
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      setPermission(PERMISSION_STATES.DENIED);
      return false;
    }
  };

  return { permission, requestPermission };
}
