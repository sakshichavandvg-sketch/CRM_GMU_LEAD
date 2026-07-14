"use client";

import { Upload, Download, Plus } from "lucide-react";

export default function TableActions({ activeTab }) {

  return (
    <div className="flex gap-3">

      {activeTab === "leads" && (
        <>
          <button className="h-11 rounded-xl border border-gray-200 px-5 flex items-center gap-2 hover:bg-gray-50 transition">

            <Upload size={18} />

            Import CSV

          </button>

          <button className="h-11 rounded-xl border border-gray-200 px-5 flex items-center gap-2 hover:bg-gray-50 transition">

            <Download size={18} />

            Export

          </button>
        </>
      )}

      <button className="h-11 rounded-xl bg-[var(--primary)] px-6 text-white flex items-center gap-2 hover:opacity-95 transition">

        <Plus size={18} />

        {activeTab === "users"
          ? "Add User"
          : "Create Lead"}

      </button>

    </div>
  );
}