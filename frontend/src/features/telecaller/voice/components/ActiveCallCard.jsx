import React from "react";
import { Phone, Mic, MicOff, Pause, Grid3X3, PhoneOff, StickyNote, Loader2 } from "lucide-react";
import { useVoice } from "../context/VoiceProvider";
import { VOICE_STATES } from "../utils/twilioEvents";
import CallControls from "./CallControls";

export default function ActiveCallCard({ callNotes, setCallNotes }) {
  const voiceCtx = useVoice();
  const voiceState = voiceCtx?.voiceState || "IDLE";
  const formattedTime = voiceCtx?.formattedTime || "00:00";

  const isActive =
    voiceState === VOICE_STATES.CONNECTING ||
    voiceState === VOICE_STATES.RINGING ||
    voiceState === VOICE_STATES.CONNECTED;

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[15px] font-[700] text-gray-900">Active Call</h2>
        {!isActive && (
          <span className="text-[12px] font-[500] text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            No Active Call
          </span>
        )}
        {isActive && (
          <span className="inline-flex items-center gap-1.5 text-[12px] font-[600] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            {voiceState === VOICE_STATES.CONNECTING && <><Loader2 size={10} className="animate-spin" /> Connecting...</>}
            {voiceState === VOICE_STATES.RINGING && "Ringing..."}
            {voiceState === VOICE_STATES.CONNECTED && "Connected"}
          </span>
        )}
      </div>

      {/* Center Content */}
      {!isActive ? (
        <div className="flex-1 flex flex-col items-center justify-center py-6">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Phone className="text-gray-300" size={28} />
          </div>
          <p className="text-[15px] font-[600] text-gray-900 mb-1">No Active Call</p>
          <p className="text-[12px] text-gray-400 text-center max-w-[240px]">
            Select a lead or enter a number to start calling.
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center py-4">
          <span className="font-mono text-[40px] font-[700] text-gray-900 tracking-widest mb-2">
            {formattedTime}
          </span>
        </div>
      )}

      {/* Notes — while connected */}
      {voiceState === VOICE_STATES.CONNECTED && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <StickyNote size={12} className="text-gray-400" />
            <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider">Quick Notes</span>
          </div>
          <textarea
            value={callNotes}
            onChange={(e) => setCallNotes(e.target.value)}
            placeholder="Type notes while on call..."
            rows={2}
            className="w-full text-[13px] bg-gray-50 border border-[#ECECEC] rounded-xl px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B]/30 resize-none transition-all"
          />
        </div>
      )}

      {/* Bottom Controls */}
      <CallControls />
    </div>
  );
}
