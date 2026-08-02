import { CalendarX2, SearchX, CheckCircle, Clock, CalendarDays, AlertTriangle } from "lucide-react";
import React from "react";

export default function EmptyFollowups({ type, message }) {
  let icon = <CalendarX2 size={48} className="text-slate-300 mb-4" />;
  let title = "No follow-ups found";
  let desc = "There are no follow-ups matching your current criteria.";

  switch (type) {
    case "no_results":
      icon = <SearchX size={48} className="text-slate-300 mb-4" />;
      title = "No matches found";
      desc = "Try adjusting your search or filters to find what you're looking for.";
      break;
    case "today":
      icon = <CheckCircle size={48} className="text-emerald-300 mb-4" />;
      title = "You're all caught up!";
      desc = "No follow-ups scheduled for today.";
      break;
    case "completed":
      icon = <CheckCircle size={48} className="text-emerald-300 mb-4" />;
      title = "Great work!";
      desc = "Everything completed.";
      break;
    case "upcoming":
      icon = <CalendarDays size={48} className="text-slate-300 mb-4" />;
      title = "Nothing scheduled.";
      desc = "Use Calendar to schedule work.";
      break;
    case "overdue":
      icon = <AlertTriangle size={48} className="text-slate-300 mb-4" />;
      title = "No overdue tasks";
      desc = "You are completely up to date.";
      break;
    case "empty_day":
      icon = <Clock size={48} className="text-slate-300 mb-4" />;
      title = "No work scheduled";
      desc = "You have a clear schedule for this day.";
      break;
  }

  if (message) desc = message;

  return (
    <div className="flex flex-col items-center justify-center h-[300px] p-8 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl w-full mt-4">
      {icon}
      <h3 className="text-lg font-[600] text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 font-[500]">{desc}</p>
    </div>
  );
}
