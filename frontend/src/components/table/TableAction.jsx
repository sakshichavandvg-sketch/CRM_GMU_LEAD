"use client";

import { MoreHorizontal } from "lucide-react";

export default function TableAction() {
  return (
    <button
      className="
        rounded-lg
        p-2
        text-gray-500
        hover:bg-gray-100
        transition
      "
    >
      <MoreHorizontal size={18} />
    </button>
  );
}