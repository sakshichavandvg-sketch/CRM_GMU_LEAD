import { useState, useEffect } from "react";
import { voiceManager } from "../utils/VoiceManager";
import { DEVICE_EVENTS, CALL_EVENTS, VOICE_STATES, mapTwilioError } from "../utils/twilioEvents";

export function useVoiceEvents() {
  const [voiceState, setVoiceState] = useState(voiceManager.state);
  const [errorMsg, setErrorMsg] = useState(null);
  const [warningMsg, setWarningMsg] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);

  useEffect(() => {
    const handleStateChange = (newState) => setVoiceState(newState);
    const handleError = (error) => {
      setErrorMsg(mapTwilioError(error.code, error.message));
      setTimeout(() => setErrorMsg(null), 5000);
    };
    const handleWarning = ({ warningName }) => setWarningMsg(warningName);
    const handleWarningCleared = () => setWarningMsg(null);
    const handleIncoming = (call) => setIncomingCall(call);

    // Register event listeners on the singleton manager
    voiceManager.on("stateChange", handleStateChange);
    voiceManager.on(DEVICE_EVENTS.ERROR, handleError);
    voiceManager.on(CALL_EVENTS.ERROR, handleError);
    voiceManager.on(CALL_EVENTS.WARNING, handleWarning);
    voiceManager.on(CALL_EVENTS.WARNING_CLEARED, handleWarningCleared);
    voiceManager.on(DEVICE_EVENTS.INCOMING, handleIncoming);

    return () => {
      // Cleanup
      voiceManager.off("stateChange", handleStateChange);
      voiceManager.off(DEVICE_EVENTS.ERROR, handleError);
      voiceManager.off(CALL_EVENTS.ERROR, handleError);
      voiceManager.off(CALL_EVENTS.WARNING, handleWarning);
      voiceManager.off(CALL_EVENTS.WARNING_CLEARED, handleWarningCleared);
      voiceManager.off(DEVICE_EVENTS.INCOMING, handleIncoming);
    };
  }, []);

  return { voiceState, errorMsg, warningMsg, incomingCall, setErrorMsg };
}
