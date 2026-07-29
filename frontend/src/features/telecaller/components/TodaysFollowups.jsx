import { PhoneCall, ChevronRight, CheckCircle2, User } from "lucide-react";

export default function TodaysFollowups({ followups = [], onCallLead }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col h-full">
      <div className="p-6 flex justify-between items-start pb-2">
        <div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Today's<br/>Schedule</h3>
          <p className="text-[11px] font-medium text-gray-500 mt-1">Your follow-ups for<br/>today</p>
        </div>
        <button className="flex items-center text-[11px] font-bold text-gray-800 hover:text-black transition-colors w-24 text-right justify-end leading-tight mt-1">
          View full schedule <ChevronRight size={14} className="ml-1 shrink-0" strokeWidth={3} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-6 mt-4">
        <div className="space-y-3">
          {followups.map((lead) => (
            <div key={lead.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between hover:border-gray-200 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100/50 text-blue-500 flex items-center justify-center shrink-0">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-gray-900">{lead.name}</p>
                  <p className="text-[11px] font-medium text-gray-500 mt-0.5">{lead.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-gray-900">{lead.time}</span>
                <button 
                  onClick={() => onCallLead && onCallLead(lead.id)}
                  className="h-9 w-9 rounded-full bg-emerald-100/50 text-emerald-500 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                  title="Call Lead"
                >
                  <PhoneCall size={16} fill="currentColor" className="opacity-80" />
                </button>
              </div>
            </div>
          ))}
          {followups.length === 0 && (
            <div className="text-center text-gray-500 text-sm py-4">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 opacity-50 text-emerald-500" />
              <p>All caught up for today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
