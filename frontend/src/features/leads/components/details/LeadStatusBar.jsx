import React from 'react';

const LeadStatusBar = React.memo(({ status }) => {
  if (!status) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 py-3 border-b border-gray-100">
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Status:</span>
        <span className="text-sm font-semibold text-gray-800">{status.currentStatus}</span>
      </div>
      
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Stage:</span>
        <span className="text-sm font-semibold text-gray-800">{status.stage}</span>
      </div>

      {status.score && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-md">
          <span className="text-xs text-blue-600 font-medium uppercase tracking-wider">Score:</span>
          <span className="text-sm font-bold text-blue-700">{status.score}</span>
        </div>
      )}

      {status.readOnly && (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 rounded-md ml-auto">
          <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Read Only</span>
        </div>
      )}
    </div>
  );
});

LeadStatusBar.displayName = "LeadStatusBar";
export default LeadStatusBar;
