import React, { useState } from "react";
import { Mic, MicOff, Pause, Grid3X3, PhoneOff, ArrowRightLeft } from "lucide-react";
import { useVoice } from "../context/VoiceProvider";
import { VOICE_STATES } from "../utils/twilioEvents";

const DTMF_KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["*", "0", "#"],
];

export default function CallControls() {
  const voiceCtx = useVoice();
  const voiceState = voiceCtx?.voiceState || "IDLE";
  const [isMuted, setIsMuted] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);

  const isConnected = voiceState === VOICE_STATES.CONNECTED;
  const isActive =
    voiceState === VOICE_STATES.CONNECTING ||
    voiceState === VOICE_STATES.RINGING ||
    voiceState === VOICE_STATES.CONNECTED;

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    voiceCtx?.muteCall(next);
  };

  const handleEndCall = () => {
    voiceCtx?.endCall();
    setIsMuted(false);
    setShowKeypad(false);
  };

  const handleSendDigit = (digit) => {
    voiceCtx?.sendDigits(digit);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* DTMF Keypad */}
      {showKeypad && isConnected && (
        <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-xl border border-[#ECECEC] mb-2">
          {DTMF_KEYS.flat().map((key) => (
            <button
              key={key}
              onClick={() => handleSendDigit(key)}
              className="w-11 h-11 rounded-xl bg-white border border-[#ECECEC] text-gray-900 font-[600] text-base hover:bg-gray-100 active:bg-gray-200 transition-colors shadow-sm"
            >
              {key}
            </button>
          ))}
        </div>
      )}

      {/* Button Row — matches Image 1 exactly: Mute | Hold | Keypad | End Call */}
      <div className="flex items-center gap-2 w-full">
        <button
          onClick={handleToggleMute}
          disabled={!isActive}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[12px] font-[600] border transition-all flex-1 justify-center ${
            isMuted
              ? "bg-amber-50 border-amber-200 text-amber-700"
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
          Mute
        </button>

        <button
          disabled={!isActive}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[12px] font-[600] border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 transition-all flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Pause size={14} />
          Hold
        </button>

        <button
          onClick={() => setShowKeypad(!showKeypad)}
          disabled={!isActive}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[12px] font-[600] border transition-all flex-1 justify-center ${
            showKeypad
              ? "bg-blue-50 border-blue-200 text-blue-700"
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <Grid3X3 size={14} />
          Keypad
        </button>

        <button
          onClick={handleEndCall}
          disabled={!isActive}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[12px] font-[600] bg-[#7A1F2B] hover:bg-[#6a1b26] text-white transition-all justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          <PhoneOff size={14} />
          End Call
        </button>
      </div>
    </div>
  );
}
