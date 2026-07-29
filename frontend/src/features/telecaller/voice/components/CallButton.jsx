import React, { useState } from "react";
import { PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import CallDialog from "./CallDialog";
import { useVoice } from "../context/VoiceProvider";
import { VOICE_STATES } from "../utils/twilioEvents";

export default function CallButton({ enquiryNo, phone, name, variant = "primary", className, iconOnly = false }) {
  const { voiceState, startCall, setErrorMsg } = useVoice();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isBusy = voiceState === VOICE_STATES.CONNECTING || voiceState === VOICE_STATES.CONNECTED || voiceState === VOICE_STATES.RINGING;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isBusy) {
      setErrorMsg("Finish current call first.");
      return;
    }

    if (voiceState !== VOICE_STATES.READY) {
      setErrorMsg("Device is not ready. Please check permissions or network.");
      return;
    }

    setIsDialogOpen(true);
  };

  const handleConfirmCall = () => {
    setIsDialogOpen(false);
    startCall(enquiryNo, phone);
  };

  if (iconOnly) {
    return (
      <>
        <button
          onClick={handleClick}
          disabled={isBusy || voiceState !== VOICE_STATES.READY}
          className={`w-9 h-9 rounded-full bg-[#7A1F2B]/10 text-[#7A1F2B] hover:bg-[#7A1F2B] hover:text-white flex items-center justify-center transition-colors shrink-0 group-hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          title={`Call ${name || phone}`}
          aria-label={`Call ${name || phone}`}
        >
          <PhoneCall size={16} />
        </button>
        {isDialogOpen && (
          <CallDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onConfirm={handleConfirmCall}
            name={name}
            phone={phone}
          />
        )}
      </>
    );
  }

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isBusy || voiceState !== VOICE_STATES.READY}
        variant={variant === "primary" ? "default" : variant}
        className={`justify-center font-semibold rounded-lg shadow-sm px-4 py-2 text-sm ${variant === "primary" ? "bg-[#7A1F2B] hover:bg-[#6a1b26] text-white" : ""} ${className}`}
        icon={<PhoneCall size={14} />}
      >
        Call
      </Button>

      {isDialogOpen && (
        <CallDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onConfirm={handleConfirmCall}
          name={name}
          phone={phone}
        />
      )}
    </>
  );
}
