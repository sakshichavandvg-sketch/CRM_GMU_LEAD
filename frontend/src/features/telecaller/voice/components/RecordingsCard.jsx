import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Download, Mic } from "lucide-react";
import { useRecordings } from "../hooks/useRecordings";
import { formatDuration, formatCallDate } from "../utils/callMapper";

function AudioPlayer({ src, duration }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex items-center gap-3">
      <audio ref={audioRef} src={src} preload="metadata" />

      <button
        onClick={togglePlay}
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
          isPlaying
            ? "bg-[#7A1F2B] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>

      {/* CSS Waveform — lightweight substitute */}
      <div className="flex-1 h-8 flex items-center gap-[2px]">
        {Array.from({ length: 30 }).map((_, i) => {
          const barHeight = Math.max(12, Math.abs(Math.sin((i * 0.7) + 1.2)) * 100);
          const filled = (i / 30) * 100 < progress;
          return (
            <div
              key={i}
              className={`w-[3px] rounded-full transition-all ${
                filled ? "bg-[#7A1F2B]" : "bg-gray-200"
              }`}
              style={{ height: `${barHeight}%` }}
            />
          );
        })}
      </div>

      <span className="text-xs font-mono text-gray-500 shrink-0">{formatDuration(duration)}</span>
    </div>
  );
}

export default function RecordingsCard() {
  const { recordings, isLoading } = useRecordings();

  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-[16px] font-[600] text-gray-900 mb-5">Call Recordings</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 animate-pulse">
              <div className="w-9 h-9 rounded-full bg-gray-100 shrink-0" />
              <div className="flex-1 h-6 bg-gray-100 rounded" />
              <div className="w-12 h-4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (recordings.length === 0) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-[16px] font-[600] text-gray-900 mb-5">Call Recordings</h2>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
            <Mic className="text-gray-300" size={24} />
          </div>
          <p className="text-sm font-[600] text-gray-900">No recordings yet</p>
          <p className="text-xs text-gray-500 mt-1 max-w-[220px]">
            Recordings will appear here after your first completed call with recording enabled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[16px] font-[600] text-gray-900">Call Recordings</h2>
        <span className="text-xs font-[500] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {recordings.length} recordings
        </span>
      </div>

      <div className="space-y-4 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
        {recordings.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-[14px] border border-[#ECECEC] hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-[600] text-gray-900 truncate">{rec.leadName}</span>
                <span className="text-xs text-gray-400 truncate">{rec.phone}</span>
              </div>
              <span className="text-xs text-gray-400 shrink-0">{formatCallDate(rec.date)}</span>
            </div>

            <AudioPlayer src={rec.recordingUrl} duration={rec.duration} />

            <div className="flex items-center justify-end mt-3 gap-2">
              <a
                href={rec.recordingUrl}
                download
                className="inline-flex items-center gap-1 text-xs font-[500] text-gray-500 hover:text-gray-700 px-2 py-1 rounded-lg border border-[#ECECEC] hover:bg-gray-50 transition-colors"
              >
                <Download size={12} />
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
