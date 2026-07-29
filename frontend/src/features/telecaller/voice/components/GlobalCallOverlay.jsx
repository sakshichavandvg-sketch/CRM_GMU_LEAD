import React, { useState } from "react";
import { useVoice } from "../context/VoiceProvider";
import { VOICE_STATES } from "../utils/twilioEvents";
import { Phone, PhoneOff, Mic, MicOff, AlertTriangle, Loader2 } from "lucide-react";
import IncomingCallToast from "./IncomingCallToast";

export default function GlobalCallOverlay() {
  const { voiceState, errorMsg, warningMsg, formattedTime, endCall, muteCall } = useVoice();
  const [isMuted, setIsMuted] = useState(false);

  // Determine if overlay should be visible
  const isVisible =
    voiceState === VOICE_STATES.CONNECTING ||
    voiceState === VOICE_STATES.RINGING ||
    voiceState === VOICE_STATES.CONNECTED;

  const handleToggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    muteCall(newMuteState);
  };

  return (
    <>
      <IncomingCallToast />
      
      {/* Error Toast */}
      {errorMsg && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 duration-300">
          <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 flex items-start gap-3 w-80">
            <AlertTriangle className="text-red-500 shrink-0" size={20} />
            <div className="flex flex-col">
              <span className="font-semibold text-red-800 text-sm">Voice Error</span>
              <span className="text-red-600 text-sm mt-0.5">{errorMsg}</span>
            </div>
          </div>
        </div>
      )}

      {/* Global Call Overlay */}
      {isVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-gray-900 text-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-6 border border-gray-700/50 backdrop-blur-md">
            
            {/* Status & Caller Info */}
            <div className="flex items-center gap-3 border-r border-gray-700 pr-6">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 shrink-0">
                {voiceState === VOICE_STATES.CONNECTING ? (
                  <Loader2 size={18} className="text-amber-400 animate-spin" />
                ) : voiceState === VOICE_STATES.RINGING ? (
                  <Phone size={18} className="text-blue-400 animate-pulse" />
                ) : (
                  <Phone size={18} className="text-emerald-400" />
                )}
                
                {/* Connection Warning Indicator */}
                {warningMsg && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-500 border-2 border-gray-900 rounded-full animate-pulse" title={warningMsg}></span>
                )}
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {voiceState === VOICE_STATES.CONNECTING ? "Connecting" : voiceState === VOICE_STATES.RINGING ? "Ringing" : "Connected"}
                </span>
                <span className="font-mono text-lg font-bold text-gray-100 tracking-wider">
                  {formattedTime}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMute}
                disabled={voiceState !== VOICE_STATES.CONNECTED}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isMuted 
                    ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              <button
                onClick={endCall}
                className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                title="End Call"
              >
                <PhoneOff size={20} />
              </button>
            </div>
            
          </div>
          
          {/* Network Warning Toast */}
          {warningMsg && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap shadow-sm border border-amber-200">
              ⚠️ Poor connection quality
            </div>
          )}
        </div>
      )}
    </>
  );
}
