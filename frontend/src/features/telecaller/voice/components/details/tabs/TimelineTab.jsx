import React from "react";
import TelecallerTimelineTab from "@/features/telecaller/components/details/tabs/TelecallerTimelineTab";
import { AlertCircle } from "lucide-react";

export default function TimelineTab({ enquiryNo }) {
  if (!enquiryNo) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-xl border border-dashed border-[#ECECEC] mt-4">
        <AlertCircle size={28} className="text-gray-300 mb-2" />
        <p className="text-sm font-[500] text-gray-500">No lead history available for this call.</p>
      </div>
    );
  }

  // Reuse the exact timeline tab from the leads module
  return (
    <div className="py-4">
      <TelecallerTimelineTab leadId={enquiryNo} />
    </div>
  );
}
