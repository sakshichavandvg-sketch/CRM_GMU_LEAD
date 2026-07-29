import React from "react";
import Button from "@/components/ui/Button";
import { PhoneCall } from "lucide-react";

export default function CallDialog({ isOpen, onClose, onConfirm, name, phone }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PhoneCall size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name || "Unknown"}</h3>
          <p className="text-gray-500 font-medium mb-6 text-lg">{phone || "No phone number"}</p>
          
          <div className="flex gap-3 justify-center">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 justify-center"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 justify-center bg-[#7A1F2B] hover:bg-[#6a1b26] text-white"
            >
              Start Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
