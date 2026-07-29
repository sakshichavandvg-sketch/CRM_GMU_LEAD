import React, { useState, useEffect } from "react";
import { useVoice } from "../context/VoiceProvider";
import { PhoneIncoming, Phone, PhoneOff } from "lucide-react";
import Button from "@/components/ui/Button";

const ENABLE_INCOMING_CALLS = true; // Enabled inbound calling

export default function IncomingCallToast() {
  const { incomingCall } = useVoice();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (incomingCall && ENABLE_INCOMING_CALLS) {
      setIsVisible(true);
      
      // Listen for disconnect to hide toast
      const handleDisconnect = () => setIsVisible(false);
      incomingCall.on("disconnect", handleDisconnect);
      incomingCall.on("cancel", handleDisconnect);
      incomingCall.on("reject", handleDisconnect);
      
      return () => {
        incomingCall.removeListener("disconnect", handleDisconnect);
        incomingCall.removeListener("cancel", handleDisconnect);
        incomingCall.removeListener("reject", handleDisconnect);
      };
    }
  }, [incomingCall]);

  if (!isVisible || !incomingCall) return null;

  const handleAccept = () => {
    incomingCall.accept();
    setIsVisible(false);
  };

  const handleReject = () => {
    incomingCall.reject();
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-80 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 animate-bounce">
            <PhoneIncoming size={24} />
          </div>
          <div className="flex flex-col pt-1">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Incoming Call</span>
            <span className="text-lg font-bold text-gray-900 truncate">
              {incomingCall.parameters?.From || "Unknown Caller"}
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={handleReject}
            variant="outline"
            className="flex-1 justify-center border-red-200 text-red-600 hover:bg-red-50"
            icon={<PhoneOff size={16} />}
          >
            Reject
          </Button>
          <Button
            onClick={handleAccept}
            className="flex-1 justify-center bg-emerald-600 hover:bg-emerald-700 text-white"
            icon={<Phone size={16} />}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
