"use client";

import { Download, Trash2, UserPlus, X } from "lucide-react";

export default function BulkActionBar({
  selectedCount,
  onClear,
}) {
  if (selectedCount === 0) return null;

  return (
    <div
      className="
        mb-5
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-gray-200
        bg-white
        px-6
        py-4
        shadow-sm
      "
    >
      <p className="font-medium text-slate-700">
        {selectedCount} selected
      </p>

      <div className="flex items-center gap-3">

        <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">
          <UserPlus size={16} />
          Assign
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50">
          <Download size={16} />
          Export
        </button>

        <button className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
          <Trash2 size={16} />
          Delete
        </button>

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