import React from 'react';

const LeadHeader = React.memo(({ header }) => {
  if (!header) return null;
  
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-900">{header.name}</h2>
        {header.priority && (
          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
            {header.priority} Priority
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 font-medium">{header.course}</p>
    </div>
  );
});

LeadHeader.displayName = "LeadHeader";
export default LeadHeader;
