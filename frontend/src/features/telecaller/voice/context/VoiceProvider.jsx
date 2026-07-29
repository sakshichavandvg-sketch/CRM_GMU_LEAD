"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
// NOTE: @twilio/voice-sdk is NOT statically imported here — it uses browser-only
// WebRTC APIs that crash during Next.js SSR. The SDK is dynamically imported
// inside VoiceManager.initialize() which only runs on the client.

import useAuthStore from "@/store/authStore";
import { ROLES } from "@/constants/roles";
import { useVoiceDevice } from "../hooks/useVoiceDevice";
import { useVoiceEvents } from "../hooks/useVoiceEvents";
import { useVoiceCall } from "../hooks/useVoiceCall";
import { useCallTimer } from "../hooks/useCallTimer";
import { VOICE_STATES, CALL_EVENTS } from "../utils/twilioEvents";
import { voiceManager } from "../utils/VoiceManager";
import { enumerateAudioDevices } from "../utils/audioUtils";
import GlobalCallOverlay from "../components/GlobalCallOverlay";

const VoiceContext = createContext(null);

export function VoiceProvider({ children }) {
  return <VoiceProviderInner>{children}</VoiceProviderInner>;
}

function VoiceProviderInner({ children }) {
  const { isInitialized, disconnectAll } = useVoiceDevice();
  const { voiceState, errorMsg, warningMsg, incomingCall, setErrorMsg } =
    useVoiceEvents();
  const { startCall, endCall, muteCall, sendDigits, handleCallDisconnect } =
    useVoiceCall(voiceState, setErrorMsg);
  const { formattedTime } = useCallTimer(voiceState);

  // ─── Post-call modal tracking ────────────────────────────────────────────
  const [postCallEnquiryNo, setPostCallEnquiryNo] = useState(null);

  // ─── Shared selection state ────────────────────────────────────────────────
  // selectedLead: the lead currently chosen in QuickDial — persists across pages
  const [selectedLead, setSelectedLead] = useState(null);
  // selectedCallId: the call ID currently open in the detail drawer
  const [selectedCallId, setSelectedCallId] = useState(null);

  // ─── Unified mute state ───────────────────────────────────────────────────
  const [isMuted, setIsMuted] = useState(false);

  // ─── Device diagnostics ───────────────────────────────────────────────────
  const [identity, setIdentity] = useState(null);
  const [sdkVersion, setSdkVersion] = useState(null);
  const [region, setRegion] = useState(null);
  const [micDevice, setMicDevice] = useState("Default");
  const [speakerDevice, setSpeakerDevice] = useState("Default");

  // Resolve SDK version once on mount
  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const { Device } = await import("@twilio/voice-sdk");
        setSdkVersion(Device.VERSION || "2.x");
      } catch {
        setSdkVersion("2.x");
      }
    };
    fetchVersion();
  }, []);

  // Resolve device identity + region once Twilio registers
  useEffect(() => {
    if (voiceState === VOICE_STATES.READY || voiceState === VOICE_STATES.CONNECTED) {
      const dev = voiceManager.device;
      if (dev) {
        try {
          setIdentity(dev.identity || null);
          // Edge/region: available on some SDK versions via dev.edge
          setRegion(dev.edge || "default");
        } catch {
          // Silently ignore — not all SDK versions expose these
        }
      }
    }
  }, [voiceState]);

  // Enumerate audio devices once on mount for diagnostic display
  useEffect(() => {
    enumerateAudioDevices()
      .then(({ inputs, outputs }) => {
        const mic = inputs.find((d) => d.deviceId !== "") || inputs[0];
        const spk = outputs.find((d) => d.deviceId !== "") || outputs[0];
        if (mic?.label) setMicDevice(mic.label);
        if (spk?.label) setSpeakerDevice(spk.label);
      })
      .catch(() => {
        // Keep defaults if enumeration fails
      });
  }, []);

  // Reset mute state when call ends
  useEffect(() => {
    if (
      voiceState === VOICE_STATES.READY ||
      voiceState === VOICE_STATES.IDLE ||
      voiceState === VOICE_STATES.DISCONNECTED
    ) {
      setIsMuted(false);
    }
  }, [voiceState]);

  // ─── Disconnect listener ─────────────────────────────────────────────────
  useEffect(() => {
    const handleDisconnect = () => {
      handleCallDisconnect();
    };
    voiceManager.on(CALL_EVENTS.DISCONNECT, handleDisconnect);
    return () => {
      voiceManager.off(CALL_EVENTS.DISCONNECT, handleDisconnect);
    };
  }, [handleCallDisconnect]);

  // ─── Enhanced startCall — saves enquiryNo + selectedLead ────────────────
  const enhancedStartCall = useCallback(
    (enquiryNo, phone) => {
      setPostCallEnquiryNo(enquiryNo);
      setIsMuted(false);
      startCall(enquiryNo, phone);
    },
    [startCall]
  );

  // ─── Enhanced muteCall — keeps unified state in sync ────────────────────
  const enhancedMuteCall = useCallback(
    (shouldMute) => {
      setIsMuted(shouldMute);
      muteCall(shouldMute);
    },
    [muteCall]
  );

  const value = {
    // Core Twilio state
    isInitialized,
    voiceState,
    errorMsg,
    warningMsg,
    incomingCall,
    formattedTime,

    // Call actions
    startCall: enhancedStartCall,
    endCall,
    muteCall: enhancedMuteCall,
    sendDigits,
    disconnectAll,
    setErrorMsg,

    // Post-call tracking
    postCallEnquiryNo,
    setPostCallEnquiryNo,

    // Shared selection state
    selectedLead,
    setSelectedLead,
    selectedCallId,
    setSelectedCallId,

    // Unified mute state
    isMuted,
    setIsMuted,

    // Device diagnostics
    identity,
    sdkVersion,
    region,
    micDevice,
    speakerDevice,
  };

  return (
    <VoiceContext.Provider value={value}>
      {children}
      <GlobalCallOverlay />
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (context === undefined) {
    throw new Error("useVoice must be used within a VoiceProvider");
  }
  return context;
}
