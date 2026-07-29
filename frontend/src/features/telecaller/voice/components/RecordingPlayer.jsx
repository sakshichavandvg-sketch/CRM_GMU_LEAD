import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Download, Volume2, VolumeX } from "lucide-react";
import { formatDuration } from "../utils/callMapper";

export default function RecordingPlayer({ src, duration }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isHoveringVolume, setIsHoveringVolume] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
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

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = val;
      setVolume(val);
      if (val === 0) {
        audio.muted = true;
        setIsMuted(true);
      } else if (isMuted) {
        audio.muted = false;
        setIsMuted(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all shadow-sm ${
          isPlaying
            ? "bg-[#7A1F2B] text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>

      {/* Waveform Visualization (CSS Approximation) */}
      <div className="flex-1 h-8 flex items-center gap-[2px]">
        {Array.from({ length: 30 }).map((_, i) => {
          // Generates a nice looking fake waveform pattern
          const barHeight = Math.max(12, Math.abs(Math.sin((i * 0.7) + 1.2)) * 100);
          const filled = (i / 30) * 100 <= progress;
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

      {/* Time Display */}
      <div className="text-xs font-mono text-gray-500 shrink-0 w-[85px] text-right">
        {formatDuration(currentTime)} / {formatDuration(duration)}
      </div>

      {/* Volume Control */}
      <div 
        className="relative flex items-center"
        onMouseEnter={() => setIsHoveringVolume(true)}
        onMouseLeave={() => setIsHoveringVolume(false)}
      >
        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
        >
          {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        
        {/* Volume Slider (shows on hover) */}
        <div 
          className={`absolute right-full mr-1 bg-white border border-[#ECECEC] rounded-xl shadow-lg p-2 transition-all origin-right ${
            isHoveringVolume ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
          }`}
        >
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-20 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#7A1F2B]"
          />
        </div>
      </div>
    </div>
  );
}
