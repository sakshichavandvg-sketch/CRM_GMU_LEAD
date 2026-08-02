import React, { useEffect, useRef, useCallback } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import Select from "@/components/ui/Select";

export default function CallFilterDrawer({ 
  isOpen, 
  onClose, 
  draftFilters, 
  setDraftFilters, 
  onApply, 
  onReset
}) {
  const drawerRef = useRef(null);

  // Focus trap & ESC listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      
      // Basic focus trap
      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        const closeBtn = drawerRef.current?.querySelector('button[aria-label="Close filters"]');
        closeBtn?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = useCallback((key, value) => {
    setDraftFilters(prev => ({ ...prev, [key]: value }));
  }, [setDraftFilters]);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div 
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter Calls"
        className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-gray-900 font-semibold text-lg">
            <SlidersHorizontal size={20} className="text-gray-500" />
            <h2>Refine Results</h2>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close filters"
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D28]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <Select
            label="Call Status"
            name="status"
            value={draftFilters.status || ""}
            onChange={(e) => handleChange("status", e.target.value)}
            options={[
              { value: "", label: "All Status" },
              { value: "Connected", label: "Connected" },
              { value: "No Answer", label: "No Answer" },
              { value: "Busy", label: "Busy" },
              { value: "Failed", label: "Failed" },
            ]}
          />
          <Select
            label="Direction"
            name="direction"
            value={draftFilters.direction || ""}
            onChange={(e) => handleChange("direction", e.target.value)}
            options={[
              { value: "", label: "All Directions" },
              { value: "Inbound", label: "Inbound" },
              { value: "Outbound", label: "Outbound" },
            ]}
          />
          <Select
            label="Recording"
            name="hasRecording"
            value={draftFilters.hasRecording || ""}
            onChange={(e) => handleChange("hasRecording", e.target.value)}
            options={[
              { value: "", label: "All Calls" },
              { value: "true", label: "Available" },
              { value: "false", label: "Not Available" },
            ]}
          />
        </div>

        <div className="p-5 border-t border-gray-100 bg-white flex items-center gap-3">
          <button
            onClick={onReset}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D28] focus:ring-offset-1"
          >
            Reset
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#6F1D28] rounded-xl hover:bg-[#5a1720] shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#6F1D28] focus:ring-offset-1"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
