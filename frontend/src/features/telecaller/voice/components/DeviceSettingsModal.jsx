import React, { useState, useEffect } from "react";
import { X, Mic, Volume2, Settings2 } from "lucide-react";
import { enumerateAudioDevices } from "../utils/audioUtils";

export default function DeviceSettingsModal({ isOpen, onClose }) {
  const [devices, setDevices] = useState({ inputs: [], outputs: [] });
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedOutput, setSelectedOutput] = useState("");
  const [volume, setVolume] = useState(80);

  useEffect(() => {
    if (!isOpen) return;
    enumerateAudioDevices().then((d) => {
      setDevices(d);
      if (d.inputs.length > 0) setSelectedInput(d.inputs[0].deviceId);
      if (d.outputs.length > 0) setSelectedOutput(d.outputs[0].deviceId);
    });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECECEC]">
          <div className="flex items-center gap-2">
            <Settings2 size={18} className="text-gray-500" />
            <h3 className="text-lg font-[700] text-gray-900">Device Settings</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Input Device */}
          <div>
            <label className="flex items-center gap-2 text-sm font-[600] text-gray-900 mb-2">
              <Mic size={14} className="text-gray-500" />
              Input Device
            </label>
            <select
              value={selectedInput}
              onChange={(e) => setSelectedInput(e.target.value)}
              className="w-full text-sm bg-gray-50 border border-[#ECECEC] rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20"
            >
              {devices.inputs.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || `Microphone ${d.deviceId.slice(0, 8)}`}
                </option>
              ))}
              {devices.inputs.length === 0 && <option>No microphone detected</option>}
            </select>
          </div>

          {/* Output Device */}
          <div>
            <label className="flex items-center gap-2 text-sm font-[600] text-gray-900 mb-2">
              <Volume2 size={14} className="text-gray-500" />
              Output Device
            </label>
            <select
              value={selectedOutput}
              onChange={(e) => setSelectedOutput(e.target.value)}
              className="w-full text-sm bg-gray-50 border border-[#ECECEC] rounded-xl px-3 py-2.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20"
            >
              {devices.outputs.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || `Speaker ${d.deviceId.slice(0, 8)}`}
                </option>
              ))}
              {devices.outputs.length === 0 && <option>Default Speaker</option>}
            </select>
          </div>

          {/* Volume */}
          <div>
            <label className="flex items-center justify-between text-sm font-[600] text-gray-900 mb-2">
              <span>Speaker Volume</span>
              <span className="text-xs font-mono text-gray-500">{volume}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7A1F2B]"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#ECECEC] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-[600] text-gray-700 border border-[#ECECEC] rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#7A1F2B] hover:bg-[#6a1b26] text-white text-sm font-[600] rounded-xl transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
