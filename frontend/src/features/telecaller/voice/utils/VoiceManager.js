import { voiceConfig } from "../config/voiceConfig";
import { voiceService } from "../services/voiceService";
import { DEVICE_EVENTS, CALL_EVENTS, VOICE_STATES } from "./twilioEvents";

// NOTE: @twilio/voice-sdk is NOT imported at the top level.
// It uses WebRTC/WebAudio APIs that are browser-only. Importing it at the
// module level causes Next.js server-side rendering to crash (shown as 404).
// Instead, it is dynamically imported inside initialize() which only runs client-side.


class VoiceManager {
  constructor() {
    if (VoiceManager.instance) {
      return VoiceManager.instance;
    }
    
    this.device = null;
    this.activeCall = null;
    this.listeners = new Map();
    this.state = VOICE_STATES.IDLE;
    
    VoiceManager.instance = this;
  }

  // Basic event emitter implementation
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.set(
        event,
        this.listeners.get(event).filter((cb) => cb !== callback)
      );
    }
  }

  emit(event, payload) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((cb) => cb(payload));
    }
  }

  setState(newState) {
    if (this.state !== newState) {
      this.state = newState;
      this.emit("stateChange", newState);
    }
  }

  async initialize() {
    if (this.device) return;

    this.setState(VOICE_STATES.REGISTERING);

    try {
      console.log("VoiceManager: Fetching token...");
      const token = await voiceService.getVoiceToken();
      console.log("VoiceManager: Token received:", token ? `${token.substring(0, 15)}...` : "null");
      
      if (!token || typeof token !== "string" || !token.startsWith("ey")) {
        throw new Error("Invalid Twilio token received from backend. Check API response.");
      }
      
      // Dynamic import — keeps @twilio/voice-sdk out of the SSR bundle entirely
      const { Device } = await import("@twilio/voice-sdk");
      this.device = new Device(token, voiceConfig);

      this.registerDeviceEvents();
      
      console.log("VoiceManager: Registering device...");
      await this.device.register();
      console.log("VoiceManager: Device registered successfully!");
      // State changes handled in events
    } catch (error) {
      console.warn("VoiceManager initialization failed:", error?.message || error);
      this.setState(VOICE_STATES.FAILED);
      this.emit(DEVICE_EVENTS.ERROR, error);
    }
  }

  registerDeviceEvents() {
    if (!this.device) return;

    this.device.on(DEVICE_EVENTS.REGISTERED, () => {
      this.setState(VOICE_STATES.READY);
      this.emit(DEVICE_EVENTS.REGISTERED);
    });

    this.device.on(DEVICE_EVENTS.REGISTERING, () => {
      this.setState(VOICE_STATES.REGISTERING);
    });

    this.device.on(DEVICE_EVENTS.UNREGISTERED, () => {
      this.setState(VOICE_STATES.OFFLINE);
      this.emit(DEVICE_EVENTS.UNREGISTERED);
    });

    this.device.on(DEVICE_EVENTS.ERROR, (error) => {
      console.warn("Twilio Device Error", error?.message || error);
      this.setState(VOICE_STATES.FAILED);
      this.emit(DEVICE_EVENTS.ERROR, error);
    });

    this.device.on(DEVICE_EVENTS.TOKEN_WILL_EXPIRE, async () => {
      try {
        const token = await voiceService.getVoiceToken();
        this.device.updateToken(token);
      } catch (error) {
        console.warn("Failed to refresh Twilio token:", error?.message || error);
      }
    });

    this.device.on(DEVICE_EVENTS.INCOMING, (call) => {
      this.emit(DEVICE_EVENTS.INCOMING, call);
    });
  }

  async connect(params) {
    if (!this.device || this.state === VOICE_STATES.CONNECTING || this.state === VOICE_STATES.CONNECTED) {
      throw new Error("Cannot start call. Device not ready or call in progress.");
    }

    this.setState(VOICE_STATES.CONNECTING);
    try {
      this.activeCall = await this.device.connect({ params });
      this.registerCallEvents(this.activeCall);
    } catch (error) {
      console.warn("Failed to connect call:", error?.message || error);
      this.setState(VOICE_STATES.FAILED);
      throw error;
    }
  }

  registerCallEvents(call) {
    call.on(CALL_EVENTS.ACCEPT, () => {
      this.setState(VOICE_STATES.CONNECTED);
      this.emit(CALL_EVENTS.ACCEPT);
    });

    call.on(CALL_EVENTS.DISCONNECT, () => {
      this.setState(VOICE_STATES.READY);
      this.activeCall = null;
      this.emit(CALL_EVENTS.DISCONNECT);
    });

    call.on(CALL_EVENTS.CANCEL, () => {
      this.setState(VOICE_STATES.READY);
      this.activeCall = null;
      this.emit(CALL_EVENTS.CANCEL);
    });

    call.on(CALL_EVENTS.REJECT, () => {
      this.setState(VOICE_STATES.READY);
      this.activeCall = null;
      this.emit(CALL_EVENTS.REJECT);
    });

    call.on(CALL_EVENTS.ERROR, (error) => {
      console.warn("Twilio Call Error:", error?.message || error);
      this.setState(VOICE_STATES.FAILED);
      this.emit(CALL_EVENTS.ERROR, error);
      
      // Attempt to clean up state
      setTimeout(() => this.setState(VOICE_STATES.READY), 3000);
    });

    call.on(CALL_EVENTS.WARNING, (warningName, warningData) => {
      this.emit(CALL_EVENTS.WARNING, { warningName, warningData });
    });

    call.on(CALL_EVENTS.WARNING_CLEARED, (warningName) => {
      this.emit(CALL_EVENTS.WARNING_CLEARED, warningName);
    });
  }

  disconnectAll() {
    if (this.device) {
      this.device.disconnectAll();
    }
  }

  mute(shouldMute) {
    if (this.activeCall) {
      this.activeCall.mute(shouldMute);
    }
  }

  sendDigits(digits) {
    if (this.activeCall) {
      this.activeCall.sendDigits(digits);
    }
  }

  destroy() {
    if (this.device) {
      this.device.destroy();
      this.device = null;
    }
    this.activeCall = null;
    this.state = VOICE_STATES.IDLE;
  }
}

export const voiceManager = new VoiceManager();
