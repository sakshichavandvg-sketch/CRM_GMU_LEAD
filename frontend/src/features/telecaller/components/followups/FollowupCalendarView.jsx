import React, { useMemo } from "react";
// Calendar-only view: this component now renders only the month grid (no agenda panel)

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function FollowupCalendarView({ 
  followups, // This is the ALL filtered array for heatmap
  selectedDate, 
  onSelectDate, 
  onSchedule, 
  onReschedule 
}) {
  const today = new Date();
  
  // Initialize calendar around the selected date or today
  const viewDate = selectedDate ? new Date(selectedDate) : today;
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Create heatmap data map: YYYY-MM-DD -> count
  const heatmap = useMemo(() => {
    const map = {};
    followups.forEach(f => {
      const d = f.scheduledDate || f.date;
      if (d) {
        map[d] = (map[d] || 0) + 1;
      }
    });
    return map;
  }, [followups]);

  // Generate grid days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Empty slots before the 1st
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    const offset = d.getTimezoneOffset();
    const _d = new Date(d.getTime() - (offset*60*1000));
    calendarDays.push(_d.toISOString().split("T")[0]);
  }

  // Followups for the currently selected day
  const selectedDayFollowups = useMemo(() => {
    if (!selectedDate) return [];
    return followups.filter(f => (f.scheduledDate || f.date) === selectedDate);
  }, [followups, selectedDate]);

  console.log("[FollowupCalendarView] render", { selectedDate, followupsCount: followups.length });

  return (
    <div className="flex flex-col border border-transparent rounded-2xl w-full">
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-[700] text-gray-900">
            {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
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
            const t = new Date();
            const tOffset = t.getTimezoneOffset();
            const _t = new Date(t.getTime() - (tOffset*60*1000));
            const isToday = dateStr === _t.toISOString().split("T")[0];
            const count = heatmap[dateStr] || 0;

            return (
              <button
                key={dateStr}
                onClick={() => {
                  console.log("[FollowupCalendarView] calendar day click", { dateStr, count, selectedDate });
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
