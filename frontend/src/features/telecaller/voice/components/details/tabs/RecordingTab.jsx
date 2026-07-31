import React, { useState, useEffect } from "react";
import { Mic, Download, ExternalLink, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import RecordingPlayer from "@/features/telecaller/voice/components/RecordingPlayer";
import { useRecording } from "@/features/telecaller/voice/hooks/useRecording";

export default function RecordingTab({ call, callId }) {
  const [copied, setCopied] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const interactionId = call?.interactionId || callId;
  
  const hasRecording = call?.recordingUrl || call?.recording_url;

  const { data: recording, isLoading, isError } = useRecording(
    hasRecording ? interactionId : null
  );

  useEffect(() => {
    if (recording) {
      if (recording instanceof Blob) {
        const url = URL.createObjectURL(recording);
        setAudioUrl(url);
        return () => URL.revokeObjectURL(url);
      } else if (typeof recording === "string") {
        setAudioUrl(recording);
      } else if (recording.url) {
        setAudioUrl(recording.url);
      }
    }
  }, [recording]);

  if (!call) return null;

  if (!hasRecording) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-xl border border-dashed border-[#ECECEC] mt-4">
        <AlertCircle size={28} className="text-gray-300 mb-2" />
        <p className="text-sm font-[500] text-gray-500">No recording available for this call</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center mt-4">
        <div className="w-8 h-8 border-4 border-[#7A1F2B] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-[500] text-gray-500">Loading recording...</p>
      </div>
    );
  }

  if (isError || !audioUrl) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-red-50/50 rounded-xl border border-red-100 mt-4">
        <AlertCircle size={28} className="text-red-400 mb-2" />
        <p className="text-sm font-[500] text-red-600">Failed to load recording</p>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(audioUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-4">
      <h4 className="text-sm font-[700] text-gray-900 mb-4 flex items-center gap-2">
        <Mic size={16} className="text-gray-400" />
        Call Recording
      </h4>
      <div className="bg-gray-50 border border-[#ECECEC] rounded-xl p-5">
        <RecordingPlayer 
          src={audioUrl} 
          duration={call.callDurationSeconds || call.callDuration || call.duration || 0} 
        />
        
        <div className="flex items-center gap-3 mt-5 pt-5 border-t border-[#ECECEC]">
          <a
            href={audioUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 text-[13px] font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <ExternalLink size={15} /> Open in new tab
          </a>
          <a
            href={audioUrl}
            download="recording.mp3"
            className="flex-1 inline-flex items-center justify-center gap-2 text-[13px] font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <Download size={15} /> Download Audio
          </a>
          <button
            onClick={handleCopyLink}
            className="flex-1 inline-flex items-center justify-center gap-2 text-[13px] font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2.5 rounded-lg transition-colors shadow-sm"
          >
            {copied ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Copy size={15} />} 
            {copied ? "Copied URL" : "Copy Direct URL"}
          </button>
        </div>
      </div>
    </div>
  );
}
