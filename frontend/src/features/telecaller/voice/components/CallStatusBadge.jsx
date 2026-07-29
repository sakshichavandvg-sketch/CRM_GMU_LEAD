import React from "react";
import { useVoice } from "../context/VoiceProvider";
import { VOICE_STATES } from "../utils/twilioEvents";
import { Phone, PhoneCall, PhoneOff, AlertTriangle, Loader2 } from "lucide-react";

export default function CallStatusBadge() {
  const { voiceState } = useVoice();

  if (voiceState === VOICE_STATES.IDLE || voiceState === VOICE_STATES.READY) {
    return null; // Don't show anything normally, only during active states
  }

  const renderBadge = () => {
    switch (voiceState) {
      case VOICE_STATES.CONNECTING:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 animate-pulse">
            <Loader2 size={12} className="animate-spin" />
            Connecting...
          </span>
        );
      case VOICE_STATES.RINGING:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 animate-pulse">
            <Phone size={12} />
            Ringing...
          </span>
        );
      case VOICE_STATES.CONNECTED:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
            <PhoneCall size={12} />
            Connected
          </span>
        );
      case VOICE_STATES.FAILED:
      case VOICE_STATES.OFFLINE:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            <AlertTriangle size={12} />
            Failed / Offline
          </span>
        );
      case VOICE_STATES.DISCONNECTED:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
            <PhoneOff size={12} />
            Call Ended
          </span>
        );
      default:
        return null;
    }
  };

  return renderBadge();
}
