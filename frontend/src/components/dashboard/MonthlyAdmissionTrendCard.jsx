"use client";

import { BarChart3 } from "lucide-react";

export default function MonthlyAdmissionTrendCard() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const heights = ["h-32", "h-48", "h-56", "h-72", "h-64", "h-80", "h-96"];

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col relative h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-900">Monthly Admission Trend</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#741B1B]"></span>
            <span className="text-xs text-gray-500">Admissions</span>
          </div>
          <select className="text-xs font-semibold bg-gray-50 border-none rounded-md py-1.5 pl-3 pr-8 text-gray-700 focus:ring-0">
            <option>This Year</option>
            <option>Last Year</option>
          </select>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-grow flex items-end justify-between gap-3 px-2 relative">
        {/* Placeholder Bars (Faded out) */}
        <div className="absolute inset-0 flex items-end justify-between gap-3 opacity-30 pointer-events-none">
          {months.map((month, idx) => {
            const isLast = idx === months.length - 1;
            const barBg = isLast ? "bg-[#741B1B] shadow-lg" : "bg-[#f4eaea]";
            const textColor = isLast ? "text-gray-900 font-extrabold" : "text-gray-400 font-bold";

            return (
              <div key={month} className="flex-1 flex flex-col items-center group">
                <div className={`w-full rounded-md ${heights[idx]} mb-3 transition-all ${barBg}`}></div>
                <span className={`text-[10px] uppercase ${textColor}`}>{month}</span>
              </div>
            );
          })}
        </div>

        {/* Empty State Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1px] z-10">
          <BarChart3 size={32} className="text-gray-300 mb-3" />
          <p className="font-semibold text-gray-900">No Data Available</p>
          <p className="text-sm text-gray-500 mt-1">Monthly trend data is pending backend support.</p>
        </div>
      </div>
    </section>
  );
}
