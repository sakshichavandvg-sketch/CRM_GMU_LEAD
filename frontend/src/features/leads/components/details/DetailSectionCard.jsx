import React from "react";

export default function DetailSectionCard({ title, icon, action, children }) {
  return (
    <div className="bg-white border border-gray-100 rounded-[20px] shadow-sm overflow-hidden flex flex-col h-fit">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
              {icon}
            </div>
          )}
          <h3 className="text-sm font-bold text-gray-900 tracking-tight">{title}</h3>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-5 flex-1 flex flex-col gap-5 text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
}
