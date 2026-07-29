import React, { useState, useEffect } from "react";
import { X, Mic, Volume2 } from "lucide-react";
import { testMicrophone, enumerateAudioDevices } from "../utils/audioUtils";

export default function AudioTestModal({ isOpen, onClose }) {
  const [micLevel, setMicLevel] = useState(0);
  const [micTester, setMicTester] = useState(null);
  const [devices, setDevices] = useState({ inputs: [], outputs: [] });
  const [selectedInput, setSelectedInput] = useState("");
  const [selectedOutput, setSelectedOutput] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    // Enumerate devices
    enumerateAudioDevices().then((d) => {
      setDevices(d);
      if (d.inputs.length > 0) setSelectedInput(d.inputs[0].deviceId);
      if (d.outputs.length > 0) setSelectedOutput(d.outputs[0].deviceId);
    });

    // Start mic test
    const tester = testMicrophone((level) => setMicLevel(level));
    setMicTester(tester);

    return () => {
      tester.stop();
    };
  }, [isOpen]);

  const handleClose = () => {
    if (micTester) micTester.stop();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECECEC]">
          <h3 className="text-lg font-[700] text-gray-900">Audio Test</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Microphone Test */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mic size={16} className="text-gray-500" />
              <span className="text-sm font-[600] text-gray-900">Microphone</span>
            </div>

            <select
              value={selectedInput}
              onChange={(e) => setSelectedInput(e.target.value)}
              className="w-full text-sm bg-gray-50 border border-[#ECECEC] rounded-xl px-3 py-2.5 text-gray-700 mb-3 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20"
            >
              {devices.inputs.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label || `Microphone ${d.deviceId.slice(0, 8)}`}
                </option>
              ))}
              {devices.inputs.length === 0 && <option>No microphone detected</option>}
            </select>

            {/* Level Meter */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-12">Level</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-75 ${
                    micLevel > 60 ? "bg-emerald-500" : micLevel > 30 ? "bg-amber-400" : "bg-gray-300"
                  }`}
                  style={{ width: `${Math.max(0, micLevel)}%` }}
                />
              </div>
              <span className="text-xs font-mono text-gray-500 w-8">{micLevel >= 0 ? micLevel : "ERR"}</span>
            </div>
            {micLevel < 0 && (
              <p className="text-xs text-red-500 mt-2">Unable to access microphone. Check browser permissions.</p>
            )}
          </div>

          {/* Speaker */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Volume2 size={16} className="text-gray-500" />
              <span className="text-sm font-[600] text-gray-900">Speaker</span>
            </div>

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
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#ECECEC] flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-[#7A1F2B] hover:bg-[#6a1b26] text-white text-sm font-[600] rounded-xl transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
