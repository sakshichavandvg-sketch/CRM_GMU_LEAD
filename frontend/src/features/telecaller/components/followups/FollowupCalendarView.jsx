import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function FollowupCalendarView({ 
  followups,
  selectedDate, 
  onSelectDate, 
  onSchedule, 
  onReschedule 
}) {
  const today = new Date();
  const [monthOffset, setMonthOffset] = useState(0);
  
  // Compute the displayed month based on offset
  const viewDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Heatmap: only count non-completed follow-ups
  const heatmap = useMemo(() => {
    const map = {};
    followups.forEach(f => {
      const isCompleted = String(f.status || "").toLowerCase() === "completed";
      if (isCompleted) return;
      const d = f.scheduledDate;
      if (d) {
        map[d] = (map[d] || 0) + 1;
      }
    });
    return map;
  }, [followups]);

  // Generate grid days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    const offset = d.getTimezoneOffset();
    const _d = new Date(d.getTime() - (offset*60*1000));
    calendarDays.push(_d.toISOString().split("T")[0]);
  }

  // Today string for highlighting
  const tOffset = today.getTimezoneOffset();
  const _t = new Date(today.getTime() - (tOffset*60*1000));
  const todayStr = _t.toISOString().split("T")[0];

  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="flex flex-col border border-transparent rounded-2xl w-full">
      <div className="w-full">
        {/* Month header with navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setMonthOffset(prev => prev - 1)}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <h2 className="text-lg font-[700] text-gray-900">
            {monthLabel}
          </h2>
          <button
            onClick={() => setMonthOffset(prev => prev + 1)}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(day => (
            <div key={day} className="text-center text-[11px] font-[700] text-slate-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dateStr, idx) => {
            if (!dateStr) return <div key={`empty-${idx}`} className="aspect-square"></div>;

            const isSelected = selectedDate === dateStr;
            const isToday = dateStr === todayStr;
            const count = heatmap[dateStr] || 0;

            return (
              <button
                key={dateStr}
                onClick={() => {
                  onSelectDate(dateStr);
                  if (count === 0) {
                    onSchedule && onSchedule(dateStr);
                  }
                }}
                className={`relative flex flex-col aspect-square p-1 rounded-lg border transition-all ${
                  isSelected 
                    ? 'border-[#7A1F2B] bg-[#7A1F2B]/5 ring-1 ring-[#7A1F2B] z-10' 
                    : isToday
                      ? 'border-slate-300 bg-slate-50'
                      : 'border-[#ECECEC] hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span className={`text-sm font-[700] ${isToday ? 'text-[#7A1F2B]' : 'text-gray-700'}`}>
                  {parseInt(dateStr.split('-')[2], 10)}
                </span>

                {/* Heatmap / badge indicator */}
                <div className="mt-auto self-center flex items-center justify-center w-full">
                  {count > 0 && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#7A1F2B]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
