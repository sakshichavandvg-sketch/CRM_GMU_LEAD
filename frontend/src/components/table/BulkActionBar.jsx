"use client";

import { Download, Trash2, UserPlus, X } from "lucide-react";

/**
 * BulkActionBar — standardized bar shown when rows are selected.
 */
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
        flex flex-col gap-3
        sm:flex-row sm:items-center sm:justify-between
        rounded-xl
        bg-[#8B0D16]/[0.05]
        border border-[#8B0D16]/20
        px-5 py-3
        shadow-sm
      "
    >
      <p className="text-sm font-semibold text-[#8B0D16]">
        {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {onAssign && (
          <button
            onClick={onAssign}
            className="flex items-center gap-2 rounded-lg border border-[#8B0D16]/30 bg-white px-4 py-2 text-sm font-medium text-[#8B0D16] hover:bg-[#8B0D16]/10 transition-colors"
          >
            <UserPlus size={15} />
            Assign
          </button>
        )}

        {onExport && (
          <button
            onClick={onExport}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Download size={15} />
            Export
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={15} />
            Delete
          </button>
        )}

        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
        >
          <X size={15} />
          Clear
        </button>
      </div>
    </div>
  );
}