import React from "react";
import { Phone, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { getInitials } from "@/features/telecaller/voice/utils/callMapper";

export default function CallHeader({ call }) {
  if (!call) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center text-xl font-[700] shrink-0 shadow-sm">
          {getInitials(call.leadName || call.name)}
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-[700] text-gray-900 leading-tight mb-1">
            {call.leadName || call.name || "Unknown"}
          </h2>
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
            <span className="font-[500] text-gray-500">{call.enquiryNo || "No Enquiry Number"}</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-[600] bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
              {call.leadStatus || "Lead"}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <Phone size={14} className="text-gray-400" />
              <span className="text-[13px] text-gray-700 font-mono">{call.phone || call.leadPhone || "N/A"}</span>
            </div>
            {call.email && (
              <div className="flex items-center gap-1.5">
                <Mail size={14} className="text-gray-400" />
                <span className="text-[13px] text-gray-700">{call.email}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (call.enquiryNo) {
              window.location.href = `/telecaller/leads/${call.enquiryNo}`;
            }
          }}
        >
          View Full Lead
        </Button>
      </div>
    </div>
  );
}
