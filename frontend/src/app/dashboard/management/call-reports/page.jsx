"use client";

import ManagementHeader from "@/components/management/ManagementHeader";
import { Filter, PhoneOff } from "lucide-react";

export default function CallReportsPage() {
  return (
    <>
      <ManagementHeader 
        title="Call Reports" 
        description="Analytics and history of telecaller activities" 
        activeTab="calls" 
      />
      
      <div className="flex items-center justify-between gap-4">
        {/* Placeholder for Filters */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter size={16} />
            Filter by Date
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            All Telecallers
          </button>
        </div>
      </div>

      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 mb-4">
          <PhoneOff className="text-gray-400" size={24} />
        </div>
        <h3 className="text-lg font-medium text-gray-900">No Call Reports Found</h3>
        <p className="mt-1 text-sm text-gray-500 max-w-sm">
          Call reports will appear here once telecallers start making calls. You can view history and analytics.
        </p>
      </div>
    </>
  );
}
