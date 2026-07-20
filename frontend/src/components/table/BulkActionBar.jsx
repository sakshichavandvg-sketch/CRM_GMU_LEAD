"use client";

import { Download, Trash2, UserPlus, X } from "lucide-react";

export default function BulkActionBar({
  selectedCount,
  onClear,
  onAssign,
  onExport,
  onDelete,
}) {
  if (selectedCount === 0) return null;

  return (
    <div
      className="
        mb-5
        flex
        flex-col
        gap-3
        sm:flex-row
        sm:items-center
        sm:justify-between
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-4
        py-3
        sm:px-6
        sm:py-4
        shadow-sm
      "
    >
      <p className="font-medium text-slate-700">
        {selectedCount} selected
      </p>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {onAssign && (
          <button 
            onClick={onAssign}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
          >
            <UserPlus size={16} />
            Assign
          </button>
        )}

        {onExport && (
          <button 
            onClick={onExport}
            className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
          >
            <Download size={16} />
            Export
          </button>
        )}

        {onDelete && (
          <button 
            onClick={onDelete}
            className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
        )}

        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
        >
          <X size={16} />
          Clear
        </button>

      </div>
    </div>
  );
}