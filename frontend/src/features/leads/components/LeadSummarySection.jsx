import React from "react";

export default function LeadSummarySection({ totalItems }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold text-gray-800">
        Showing {totalItems} {totalItems === 1 ? 'Lead' : 'Leads'}
      </h2>
    </div>
  );
}
