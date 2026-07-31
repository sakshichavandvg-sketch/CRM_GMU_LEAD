import React from "react";
import { StickyNote, AlertCircle } from "lucide-react";

export default function NotesTab({ call }) {
  if (!call) return null;

  if (!call.notes) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-xl border border-dashed border-[#ECECEC] mt-4">
        <AlertCircle size={28} className="text-gray-300 mb-2" />
        <p className="text-sm font-[500] text-gray-500">No notes recorded for this call.</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h4 className="text-sm font-[700] text-gray-900 mb-4 flex items-center gap-2">
        <StickyNote size={16} className="text-gray-400" />
        Call Notes
      </h4>
      <div className="bg-yellow-50/50 border border-yellow-100 rounded-xl p-5 shadow-sm">
        <p className="text-[14px] text-gray-800 whitespace-pre-wrap leading-relaxed">{call.notes}</p>
      </div>
    </div>
  );
}
