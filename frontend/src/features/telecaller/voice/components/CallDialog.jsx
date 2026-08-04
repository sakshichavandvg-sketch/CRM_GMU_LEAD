"use client";

import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/ui/Button";
import { PhoneCall } from "lucide-react";

export default function CallDialog({ open, isOpen, onClose, onConfirm, name, phone }) {
  const visible = open ?? isOpen;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && visible) {
        onClose?.();
      }
    },
    [visible, onClose]
  );

  useEffect(() => {
    if (!visible) return;

    // Prevent scrolling background body content while call dialog is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, handleKeyDown]);

  if (!mounted || !visible) return null;

  return createPortal(
    <div
      className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="call-dialog-title"
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PhoneCall size={32} />
          </div>
          <h3 id="call-dialog-title" className="text-xl font-bold text-gray-900 mb-1">
            {name || "Unknown"}
          </h3>
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
    </div>,
    document.body
  );
}

