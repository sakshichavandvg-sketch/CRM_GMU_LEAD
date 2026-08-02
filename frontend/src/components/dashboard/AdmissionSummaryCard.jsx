"use client";

import { useDashboardStats } from "@/features/leads/hooks/useDashboardStats";

export default function AdmissionSummaryCard() {
  // Use existing hook directly — React Query will return the cached data
  // without making a duplicate network request, avoiding prop drilling from page.jsx
  const { data } = useDashboardStats();

  const statsList = data?.stats || [];
  const followupsList = data?.tables?.followups;

  // Extract needed metrics
  // "New Leads" -> maps to "New Today"
  const newLeadsStats = statsList.find((s) => s.title === "New Today");
  const newLeadsCount = newLeadsStats ? newLeadsStats.value : 0;

  // "Admissions Today" -> maps to "Admissions" (or we just use overall admissions)
  const admissionsStats = statsList.find((s) => s.title === "Admissions");
  const admissionsCount = admissionsStats ? admissionsStats.value : 0;

  // "Follow-ups Due" -> calculate from upcoming + overdue if available, or just display a placeholder if complex
  // The backend already returns upcoming and overdue arrays in the tables object
  const upcomingCount = followupsList?.upcoming?.data?.length || 0;
  const overdueCount = followupsList?.overdue?.data?.length || 0;
  const followupsDueCount = upcomingCount + overdueCount;

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">Today&apos;s Admission Summary</h2>
        
        <div className="space-y-4">
          {/* New Leads */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                {/* Material icon placeholder: person_add_alt */}
                <svg className="w-5 h-5 text-[#741B1B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span className="text-gray-600 font-medium">New Leads</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{newLeadsCount}</span>
          </div>

          {/* Follow-ups Due */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                {/* Material icon placeholder: calendar_today */}
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-600 font-medium">Follow-ups Due</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{followupsDueCount}</span>
          </div>

          {/* Admissions Today */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                {/* Material icon placeholder: check_circle */}
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-600 font-medium">Admissions</span>
            </div>
            {/* Fallback to '--' since daily admissions might not be distinct in API yet */}
            <span className="text-lg font-bold text-gray-900">{admissionsCount !== "--" ? admissionsCount : "--"}</span>
          </div>

          {/* Revenue Impact (Pending Backend) */}
          <div className="pt-2 border-t border-gray-50">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                  <span className="font-bold text-orange-800">₹</span>
                </div>
                <span className="text-gray-600 font-medium">Revenue Impact</span>
              </div>
              <span className="text-lg font-bold text-gray-900">--</span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Progress (Pending Backend) */}
      <div className="mt-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-bold text-gray-900">Target Progress</span>
          <span className="text-lg font-bold text-[#741B1B]">--</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div className="bg-[#741B1B] h-full rounded-full" style={{ width: "0%" }}></div>
        </div>
        <p className="text-xs text-gray-400 mt-2 font-medium">Target data unavailable</p>
      </div>
    </section>
  );
}
