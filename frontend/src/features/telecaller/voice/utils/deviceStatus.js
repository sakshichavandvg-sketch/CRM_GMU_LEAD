import { VOICE_STATES } from "./twilioEvents";

/**
 * Maps the internal VOICE_STATES to a user-facing device status label and color.
 */
export function getDeviceStatusDisplay(state) {
  switch (state) {
    case VOICE_STATES.READY:
      return { label: "Ready", color: "emerald", icon: "🟢", description: "Device registered and ready to make calls" };
    case VOICE_STATES.REGISTERING:
      return { label: "Registering", color: "amber", icon: "🟠", description: "Connecting to Twilio..." };
    case VOICE_STATES.CONNECTING:
      return { label: "Connecting Call", color: "blue", icon: "🔵", description: "Establishing a call connection" };
    case VOICE_STATES.CONNECTED:
      return { label: "In Call", color: "emerald", icon: "🟢", description: "Call is active" };
    case VOICE_STATES.RINGING:
      return { label: "Ringing", color: "blue", icon: "🔵", description: "Waiting for the recipient to answer" };
    case VOICE_STATES.FAILED:
      return { label: "Error", color: "red", icon: "🔴", description: "Device encountered an error" };
    case VOICE_STATES.OFFLINE:
      return { label: "Offline", color: "red", icon: "🔴", description: "Device is unregistered" };
    case VOICE_STATES.DISCONNECTED:
      return { label: "Disconnected", color: "gray", icon: "⚪", description: "Call ended" };
    case VOICE_STATES.IDLE:
    default:
      return { label: "Initializing", color: "gray", icon: "⚪", description: "Waiting for token..." };
  }
}

/**
 * Maps warning events to a call quality label.
 */
export function getCallQuality(warningMsg) {
  if (!warningMsg) return { label: "Excellent", color: "emerald" };

  const warning = warningMsg.toLowerCase();
  if (warning.includes("high-rtt") || warning.includes("high-jitter")) {
    return { label: "Poor", color: "red" };
  }
  if (warning.includes("low-mos")) {
    return { label: "Weak Connection", color: "red" };
  }
  if (warning.includes("high-packet-loss")) {
    return { label: "Poor", color: "amber" };
  }
  return { label: "Good", color: "amber" };
}
