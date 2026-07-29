"use client";

import { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useFollowups } from "@/features/telecaller/hooks/useFollowups";
import { useUpdateFollowup } from "@/features/telecaller/hooks/useFollowupMutations";
import { Search, CalendarClock, PhoneCall, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

const KanbanColumn = ({ title, followups, onComplete, colorClass }) => {
  return (
    <div className="flex flex-col h-full bg-slate-50/50 rounded-2xl border border-[#ECECEC] p-4">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="font-[600] text-gray-900">{title}</h3>
        <span className={`text-xs font-[600] px-2.5 py-1 rounded-full bg-white border border-[#ECECEC] shadow-sm`}>
          {followups.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
        {followups.length === 0 ? (
          <div className="h-32 flex items-center justify-center text-sm text-slate-400 font-[500] border-2 border-dashed border-slate-200 rounded-xl">
            No follow-ups
          </div>
        ) : (
          followups.map(f => (
            <div key={f.id} className="bg-white border border-[#ECECEC] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-[600] text-gray-900 text-[15px]">{f.student || f.leadName || "Unknown Lead"}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-500 font-[500]">{f.course || "No Course"}</span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-xs font-[600] text-[#7A1F2B]">{f.leadStatus || f.stage || f.status || "New"}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                  f.priority === "High" ? "text-[#7A1F2B] bg-[#7A1F2B]/5 border-[#7A1F2B]/20" :
                  f.priority === "Medium" ? "text-orange-700 bg-orange-50 border-orange-200" :
                  "text-emerald-700 bg-emerald-50 border-emerald-200"
                }`}>
                  {f.priority || "Normal"}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-slate-600 font-[500] mb-3">
                <CalendarClock size={14} className="text-slate-400" />
                {f.scheduledDate || f.date} at {f.scheduledTime || f.time || "TBA"}
              </div>

              {f.remarks && (
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 text-xs text-slate-600 mb-3 line-clamp-2">
                  {f.remarks}
                </div>
              )}

              <div className="flex gap-2">
                {f.status !== "Completed" && (
                  <>
                    <Button variant="outline" size="sm" className="flex-1 h-8 text-xs font-[600]">
                      <PhoneCall size={12} className="mr-1.5" /> Call
                    </Button>
                    <Button 
                      onClick={() => onComplete(f.id)}
                      variant="primary" 
                      size="sm" 
                      className="flex-1 h-8 text-xs font-[600] bg-[#16A34A] hover:bg-[#15803d]"
                    >
                      <CheckCircle2 size={12} className="mr-1.5" /> Done
                    </Button>
                  </>
                )}
                {f.status === "Completed" && (
                  <div className="w-full text-center text-xs font-[600] text-emerald-600 bg-emerald-50 py-1.5 rounded-lg border border-emerald-100 flex items-center justify-center gap-1.5">
                    <CheckCircle2 size={14} />
                    Completed
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function FollowUpsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch ALL followups so we can distribute them into Kanban columns on the client
  const { data: allFollowupsData, isLoading } = useFollowups("all");
  const allFollowups = Array.isArray(allFollowupsData) ? allFollowupsData : [];
  const updateMutation = useUpdateFollowup();

  const handleComplete = (id) => {
    updateMutation.mutate({ id, data: { status: "Completed" } });
  };

  const filteredFollowups = allFollowups.filter(f => 
    f.student?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const todayStr = new Date().toISOString().split("T")[0];

  const overdue = filteredFollowups.filter(f => f.scheduledDate < todayStr && f.status !== "Completed");
  const today = filteredFollowups.filter(f => f.scheduledDate === todayStr && f.status !== "Completed");
  const upcoming = filteredFollowups.filter(f => f.scheduledDate > todayStr && f.status !== "Completed");
  const completed = filteredFollowups.filter(f => f.status === "Completed");

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      {/* Header */}
      <div className="flex-none bg-white border-b border-[#ECECEC] px-8 py-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-[700] text-gray-900 tracking-tight font-outfit">Follow-ups Board</h1>
            <p className="text-sm text-slate-500 font-[500] mt-1">Manage your pending calls and schedules</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#ECECEC] rounded-xl text-sm font-[500] outline-none focus:ring-2 focus:ring-[#7A1F2B] transition-shadow placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto p-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7A1F2B]"></div>
          </div>
        ) : (
          <div className="flex h-full gap-6 min-w-[1000px]">
            <div className="flex-1 min-w-[300px]">
              <KanbanColumn 
                title="Overdue" 
                followups={overdue} 
                onComplete={handleComplete}
                colorClass="text-red-600"
              />
            </div>
            <div className="flex-1 min-w-[300px]">
              <KanbanColumn 
                title="Today" 
                followups={today} 
                onComplete={handleComplete}
                colorClass="text-blue-600"
              />
            </div>
            <div className="flex-1 min-w-[300px]">
              <KanbanColumn 
                title="Upcoming" 
                followups={upcoming} 
                onComplete={handleComplete}
                colorClass="text-orange-600"
              />
            </div>
            <div className="flex-1 min-w-[300px]">
              <KanbanColumn 
                title="Completed" 
                followups={completed} 
                onComplete={handleComplete}
                colorClass="text-green-600"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
