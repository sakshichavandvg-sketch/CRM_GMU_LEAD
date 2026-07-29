import React, { useState, useEffect } from "react";
import { Wifi, Mic, Volume2, Key, BarChart3, RefreshCw, AudioLines, Settings2, User, Globe, Code2, Signal } from "lucide-react";
import { useVoice } from "../context/VoiceProvider";
import { getDeviceStatusDisplay, getCallQuality } from "../utils/deviceStatus";
import { VOICE_STATES } from "../utils/twilioEvents";

const DiagRow = ({ icon, label, value, statusDot }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-[#F5F5F5] last:border-0">
    <div className="flex items-center gap-2.5">
      <span className="text-gray-400 shrink-0">{icon}</span>
      <span className="text-[13px] text-gray-500 font-[500]">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {statusDot && (
        <span className={`w-2 h-2 rounded-full shrink-0 ${statusDot}`} />
      )}
      <span className="text-[13px] font-[600] text-gray-900 text-right max-w-[160px] truncate">
        {value}
      </span>
    </div>
  </div>
);

export default function DeviceStatusCard({ onTestAudio, onOpenSettings }) {
  const voiceCtx = useVoice();
  const voiceState = voiceCtx?.voiceState || "IDLE";
  const warningMsg = voiceCtx?.warningMsg || null;
  const identity = voiceCtx?.identity || null;
  const sdkVersion = voiceCtx?.sdkVersion || null;
  const region = voiceCtx?.region || null;
  const micDevice = voiceCtx?.micDevice || "Default";
  const speakerDevice = voiceCtx?.speakerDevice || "Default";

  const status = getDeviceStatusDisplay(voiceState);
  const quality = getCallQuality(warningMsg);

  const isReady = voiceState === VOICE_STATES.READY;
  const isConnected = voiceState === VOICE_STATES.CONNECTED;
  const isActive = isReady || isConnected;
  const isFailed = voiceState === VOICE_STATES.FAILED;

  // Token status
  const tokenStatus = isFailed
    ? { label: "Expired", dot: "bg-red-500" }
    : isActive
    ? { label: "Valid", dot: "bg-emerald-500" }
    : { label: "Pending…", dot: "bg-amber-400 animate-pulse" };

  // Network quality
  const networkStatus = isConnected
    ? { label: quality.label, dot: quality.color === "red" ? "bg-red-500" : quality.color === "amber" ? "bg-amber-400" : "bg-emerald-500" }
    : isReady
    ? { label: "Excellent", dot: "bg-emerald-500" }
    : { label: "—", dot: "bg-gray-300" };

  // Connection status badge
  const connectionBadge = {
    label: status.label,
    bg: isActive
      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
      : isFailed
      ? "bg-red-50 border-red-200 text-red-700"
      : "bg-amber-50 border-amber-200 text-amber-700",
    dot: isActive
      ? "bg-emerald-500"
      : isFailed
      ? "bg-red-500"
      : "bg-amber-400 animate-pulse",
  };

  const handleReconnect = () => {
    window.location.reload();
  };

  const diagnostics = [
    {
      icon: <User size={15} />,
      label: "Identity",
      value: identity || (isActive ? "Loading…" : "—"),
      statusDot: null,
    },
    {
      icon: <Mic size={15} />,
      label: "Microphone",
      value: micDevice,
      statusDot: null,
    },
    {
      icon: <Volume2 size={15} />,
      label: "Speaker",
      value: speakerDevice,
      statusDot: null,
    },
    {
      icon: <Code2 size={15} />,
      label: "SDK Version",
      value: sdkVersion ? `v${sdkVersion}` : "—",
      statusDot: null,
    },
    {
      icon: <Key size={15} />,
      label: "Token",
      value: tokenStatus.label,
      statusDot: tokenStatus.dot,
    },
    {
      icon: <Signal size={15} />,
      label: "Network",
      value: networkStatus.label,
      statusDot: networkStatus.dot,
    },
    {
      icon: <Globe size={15} />,
      label: "Region",
      value: region || "—",
      statusDot: null,
    },
  ];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[15px] font-[700] text-gray-900">Device Status</h2>
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-[600] border ${connectionBadge.bg}`}
        >
          <span className={`w-2 h-2 rounded-full ${connectionBadge.dot}`} />
          Twilio Device · {connectionBadge.label}
        </span>
      </div>

      {/* Diagnostic Rows */}
      <div className="flex-1 divide-y divide-[#F5F5F5]">
        {diagnostics.map((d) => (
          <DiagRow key={d.label} {...d} />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-5 flex-wrap">
        <button
          onClick={handleReconnect}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-[600] bg-[#7A1F2B] hover:bg-[#6a1b26] text-white transition-colors"
        >
          <RefreshCw size={13} />
          Reconnect
        </button>
        <button
          onClick={onTestAudio}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <AudioLines size={13} />
          Test Mic
        </button>
        <button
          onClick={onOpenSettings}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          <Settings2 size={13} />
          Audio Settings
        </button>
      </div>
    </div>
  );
}
