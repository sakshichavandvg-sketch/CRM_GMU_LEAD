import React from "react";
import { RefreshCw, Settings, Volume2 } from "lucide-react";
import { useVoice } from "../context/VoiceProvider";
import { getDeviceStatusDisplay } from "../utils/deviceStatus";

export default function VoiceHeader({ onRefresh, onOpenSettings }) {
  const voiceCtx = useVoice();
  const voiceState = voiceCtx?.voiceState || "IDLE";
  const status = getDeviceStatusDisplay(voiceState);

  const isReady = status.label === "Ready";

  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-[26px] font-[700] text-gray-900 tracking-tight">
            Telecaller Voice Center
          </h1>
          <Volume2 size={20} className="text-gray-400 mt-0.5" />
        </div>
        <p className="text-[13px] text-gray-500 font-[400]">
          Browser calling powered by Twilio
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Device Ready Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-[600] border ${
            isReady
              ? "bg-white border-emerald-200 text-emerald-700"
              : "bg-white border-amber-200 text-amber-700"
          }`}
        >
          Device {status.label}
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isReady ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
            }`}
          />
        </div>

        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={14} />
          Refresh
        </button>

        <button
          onClick={onOpenSettings}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Settings size={14} />
          Settings
        </button>
      </div>
    </div>
  );
}
