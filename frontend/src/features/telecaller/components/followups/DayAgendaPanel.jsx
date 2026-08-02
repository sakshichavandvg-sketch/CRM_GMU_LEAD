import React from "react";
import DayAgendaItem from "./DayAgendaItem";
import EmptyFollowups from "./EmptyFollowups";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default function DayAgendaPanel({ selectedDate, followups, onSchedule, onReschedule }) {
  console.log("[DayAgendaPanel] render", { selectedDate, followupsCount: followups.length, hasOnSchedule: !!onSchedule });
  const formattedDate = selectedDate 
    ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : "Select a date";

  return (
    <div className="flex flex-col h-full bg-slate-50">
      
      <div className="flex-none p-4 bg-white border-b border-[#ECECEC]">
        <h3 className="text-lg font-[700] text-gray-900">{formattedDate}</h3>
        <p className="text-sm text-slate-500 font-[500] mt-1">
          {followups.length} follow-up{followups.length !== 1 ? 's' : ''} scheduled
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {followups.length === 0 ? (
          <EmptyFollowups type="empty_day" />
        ) : (
          <div className="flex flex-col gap-3">
            {followups.map(f => (
              <DayAgendaItem key={f.id} followup={f} onReschedule={onReschedule} />
            ))}
          </div>
        )}
      </div>

      <div className="flex-none p-4 bg-white border-t border-[#ECECEC]">
        <Button 
          variant="primary" 
          onClick={() => {
            console.log("[DayAgendaPanel] Schedule Follow-up button click", { selectedDate });
            onSchedule(selectedDate);
          }}
          className="w-full justify-center h-10 bg-[#7A1F2B] hover:bg-[#6F1D28]"
        >
          <Plus size={16} className="mr-2" /> Schedule Follow-up
        </Button>
      </div>
    </div>
  );
}
