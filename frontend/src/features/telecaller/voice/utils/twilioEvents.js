// Twilio Device Events
export const DEVICE_EVENTS = {
  REGISTERED: "registered",
  REGISTERING: "registering",
  UNREGISTERED: "unregistered",
  DESTROYED: "destroyed",
  ERROR: "error",
  INCOMING: "incoming",
  TOKEN_WILL_EXPIRE: "tokenWillExpire",
};

// Twilio Call Events
export const CALL_EVENTS = {
  ACCEPT: "accept",
  DISCONNECT: "disconnect",
  CANCEL: "cancel",
  REJECT: "reject",
  ERROR: "error",
  WARNING: "warning",
  WARNING_CLEARED: "warning-cleared",
};

// Internal Voice States for UI consistency
export const VOICE_STATES = {
  IDLE: "IDLE",
  REGISTERING: "REGISTERING",
  READY: "READY",
  CONNECTING: "CONNECTING",
  RINGING: "RINGING",
  CONNECTED: "CONNECTED",
  DISCONNECTED: "DISCONNECTED",
  FAILED: "FAILED",
  OFFLINE: "OFFLINE",
};

// Internal Permission States
export const PERMISSION_STATES = {
  UNKNOWN: "UNKNOWN",
  PROMPT: "PROMPT",
  GRANTED: "GRANTED",
  DENIED: "DENIED",
};

// Error code mappings for friendly messages
export const TWILIO_ERROR_MAP = {
  31003: "Network unavailable. Please check your connection.",
  20101: "Authentication failed. Please refresh your session.",
  31205: "Microphone access blocked. Please allow microphone permissions.",
  31204: "Invalid token. Please refresh your session.",
};

export const mapTwilioError = (code, defaultMessage = "An unexpected voice error occurred.") => {
  return TWILIO_ERROR_MAP[code] || defaultMessage;
};
