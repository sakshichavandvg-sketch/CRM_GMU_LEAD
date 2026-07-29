"use client";

import React from "react";
import LeadTimelineTab from "./LeadTimelineTab";
import LeadNotesTab from "./LeadNotesTab";

export default function LeadActivityTab({ leadId, data }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-100 px-5 py-3">
          <h3 className="font-semibold text-gray-800 text-sm">Combined Activity Feed</h3>
        </div>
        <div className="p-2">
          {/* We are merging Timeline and Notes into one view for now to avoid empty tabs */}
          <LeadTimelineTab leadId={leadId} />
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="px-5 font-semibold text-gray-700 text-xs uppercase tracking-wider mb-2">Attached Notes</h4>
            <LeadNotesTab leadId={leadId} />
          </div>
        </div>
      </div>
    </div>
  );
}
