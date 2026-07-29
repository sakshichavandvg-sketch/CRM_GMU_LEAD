"use client";

import React, { useState, useMemo } from "react";
import { Search, Mic, Calendar, Filter, ChevronLeft, ChevronRight, PhoneOff, Play } from "lucide-react";
import { useRecordings } from "@/features/telecaller/voice/hooks/useRecordings";
import { useVoiceAnalytics } from "@/features/telecaller/voice/hooks/useVoiceAnalytics";
import { useVoice } from "@/features/telecaller/voice/context/VoiceProvider";
import { formatCallDate, formatDuration, getOutcomeStyle, getInitials } from "@/features/telecaller/voice/utils/callMapper";
import RecordingPlayer from "@/features/telecaller/voice/components/RecordingPlayer";
import CallDetailDrawer from "@/features/telecaller/voice/components/CallDetailDrawer";

export default function RecordingsPage() {
  const { data: allRecordings, isLoading } = useRecordings();
  const { analytics } = useVoiceAnalytics();
  const { selectedCallId, setSelectedCallId } = useVoice();

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all"); // today, yesterday, week, month, all
  const [outcomeFilter, setOutcomeFilter] = useState("all"); // connected, busy, no_answer, failed, all
  const [durationFilter, setDurationFilter] = useState("all"); // <1, 1-5, 5+, all
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ─── Filter Logic ──────────────────────────────────────────────────────────
  const filteredRecordings = useMemo(() => {
    if (!allRecordings) return [];
    
    let result = [...allRecordings];

    // Search
    if (searchQuery.length > 2) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.leadName?.toLowerCase().includes(q) ||
          r.name?.toLowerCase().includes(q) ||
          r.phone?.includes(q) ||
          r.leadPhone?.includes(q) ||
          r.enquiryNo?.toLowerCase().includes(q)
      );
    }

    // Date
    if (dateFilter !== "all") {
      const now = new Date();
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      result = result.filter((r) => {
        const d = new Date(r.callDateTime || r.createdAt || r.date);
        if (dateFilter === "today") return d >= todayStart;
        if (dateFilter === "yesterday") {
          const yesterdayStart = new Date(todayStart);
          yesterdayStart.setDate(yesterdayStart.getDate() - 1);
          return d >= yesterdayStart && d < todayStart;
        }
        if (dateFilter === "week") {
          const weekStart = new Date(todayStart);
          weekStart.setDate(weekStart.getDate() - 7);
          return d >= weekStart;
        }
        if (dateFilter === "month") {
          const monthStart = new Date(todayStart);
          monthStart.setMonth(monthStart.getMonth() - 1);
          return d >= monthStart;
        }
        return true;
      });
    }

    // Outcome
    if (outcomeFilter !== "all") {
      result = result.filter(r => {
        const outcome = (r.callOutcome || r.outcome || "").toLowerCase();
        if (outcomeFilter === "connected") return outcome === "connected";
        if (outcomeFilter === "busy") return outcome === "busy";
        if (outcomeFilter === "no_answer") return outcome === "no answer" || outcome === "no response";
        if (outcomeFilter === "failed") return outcome === "failed";
        return true;
      });
    }

    // Duration
    if (durationFilter !== "all") {
      result = result.filter(r => {
        const dur = r.callDuration || r.duration || 0;
        if (durationFilter === "<1") return dur < 60;
        if (durationFilter === "1-5") return dur >= 60 && dur <= 300;
        if (durationFilter === "5+") return dur > 300;
        return true;
      });
    }

    // Sort newest first
    return result.sort((a, b) => new Date(b.callDateTime || b.createdAt || b.date) - new Date(a.callDateTime || a.createdAt || a.date));
  }, [allRecordings, searchQuery, dateFilter, outcomeFilter, durationFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredRecordings.length / pageSize) || 1;
  const currentData = filteredRecordings.slice((page - 1) * pageSize, page * pageSize);

  // Reset page when filters change
  React.useEffect(() => {
    setPage(1);
  }, [searchQuery, dateFilter, outcomeFilter, durationFilter]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#FAFAFA] p-6">
      
      {/* Header & KPI Strip */}
      <div className="flex flex-col gap-5 mb-6 shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-[700] text-gray-900 tracking-tight flex items-center gap-3">
            <Mic className="text-[#7A1F2B]" size={26} />
            Recording Library
            <span className="text-sm font-[600] text-gray-500 bg-gray-100 px-3 py-1 rounded-full ml-2">
              {allRecordings?.length || 0} Total
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white border border-[#ECECEC] rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-xs font-[600] text-gray-500 uppercase">Today's Recordings</span>
            <span className="text-2xl font-[700] text-gray-900">
              {allRecordings?.filter(r => new Date(r.callDateTime || r.createdAt || r.date) >= new Date(new Date().setHours(0,0,0,0))).length || 0}
            </span>
          </div>
          <div className="bg-white border border-[#ECECEC] rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-xs font-[600] text-gray-500 uppercase">Avg Duration</span>
            <span className="text-2xl font-[700] text-purple-600">{formatDuration(analytics.avgDuration)}</span>
          </div>
          <div className="bg-white border border-[#ECECEC] rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-xs font-[600] text-gray-500 uppercase">Connected</span>
            <span className="text-2xl font-[700] text-emerald-600">{analytics.connected}</span>
          </div>
          <div className="bg-white border border-[#ECECEC] rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-xs font-[600] text-gray-500 uppercase">Busy</span>
            <span className="text-2xl font-[700] text-amber-600">{analytics.busy}</span>
          </div>
          <div className="bg-white border border-[#ECECEC] rounded-2xl p-4 flex flex-col gap-1 shadow-sm">
            <span className="text-xs font-[600] text-gray-500 uppercase">Failed/No Ans</span>
            <span className="text-2xl font-[700] text-red-600">{analytics.noResponse + analytics.cancelled}</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white border border-[#ECECEC] rounded-[24px] shadow-sm flex flex-col overflow-hidden">
        
        {/* Filters Toolbar */}
        <div className="p-5 border-b border-[#ECECEC] flex flex-wrap gap-4 items-center justify-between bg-gray-50/50">
          <div className="flex flex-wrap gap-3 items-center">
            
            {/* Search */}
            <div className="relative w-64">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search name, phone, enquiry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm bg-white border border-[#ECECEC] rounded-xl pl-10 pr-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20"
              />
            </div>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="text-sm bg-white border border-[#ECECEC] rounded-xl px-4 py-2 text-gray-700 font-[500] focus:outline-none cursor-pointer hover:bg-gray-50"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Outcome Filter */}
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="text-sm bg-white border border-[#ECECEC] rounded-xl px-4 py-2 text-gray-700 font-[500] focus:outline-none cursor-pointer hover:bg-gray-50"
            >
              <option value="all">All Outcomes</option>
              <option value="connected">Connected</option>
              <option value="busy">Busy</option>
              <option value="no_answer">No Answer</option>
              <option value="failed">Failed</option>
            </select>

            {/* Duration Filter */}
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="text-sm bg-white border border-[#ECECEC] rounded-xl px-4 py-2 text-gray-700 font-[500] focus:outline-none cursor-pointer hover:bg-gray-50"
            >
              <option value="all">All Durations</option>
              <option value="<1">&lt; 1 min</option>
              <option value="1-5">1 - 5 mins</option>
              <option value="5+">5+ mins</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          {isLoading ? (
            <div className="p-8 flex justify-center text-gray-400">Loading recordings...</div>
          ) : currentData.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Mic className="text-gray-300" size={32} />
              </div>
              <p className="text-base font-[600] text-gray-900">No Recordings Available</p>
              <p className="text-sm text-gray-500 mt-2 max-w-sm">
                Calls recorded through Twilio will appear here automatically. Try adjusting your filters if you can't find what you're looking for.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-white sticky top-0 z-10">
                <tr>
                  <th className="py-4 px-6 text-xs font-[600] text-gray-400 uppercase tracking-wider border-b border-[#ECECEC]">Lead</th>
                  <th className="py-4 px-6 text-xs font-[600] text-gray-400 uppercase tracking-wider border-b border-[#ECECEC]">Outcome</th>
                  <th className="py-4 px-6 text-xs font-[600] text-gray-400 uppercase tracking-wider border-b border-[#ECECEC] w-[400px]">Recording</th>
                  <th className="py-4 px-6 text-xs font-[600] text-gray-400 uppercase tracking-wider border-b border-[#ECECEC]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F5F5]">
                {currentData.map((rec) => {
                  const name = rec.leadName || rec.name || "Unknown";
                  const phone = rec.phone || rec.leadPhone || "--";
                  const outcome = rec.callOutcome || rec.outcome || "Unknown";
                  const outcomeStyle = getOutcomeStyle(outcome);
                  const duration = rec.callDuration || rec.duration || 0;
                  const date = formatCallDate(rec.callDateTime || rec.createdAt || rec.date);
                  const url = rec.recordingUrl || rec.recording_url;

                  return (
                    <tr key={rec.id || rec.interactionId} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center text-xs font-[700] shrink-0">
                            {getInitials(name)}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <button 
                              onClick={() => setSelectedCallId(rec.id || rec.interactionId)}
                              className="text-sm font-[600] text-gray-900 truncate hover:text-[#7A1F2B] text-left"
                            >
                              {name}
                            </button>
                            <span className="text-xs text-gray-500 font-mono">{phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-[600] border ${outcomeStyle.bg} ${outcomeStyle.text} ${outcomeStyle.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${outcomeStyle.dot}`} />
                          {outcome}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {url ? (
                          <div className="bg-white border border-[#ECECEC] rounded-xl p-2 w-full max-w-[360px] shadow-sm">
                            <RecordingPlayer src={url} duration={duration} />
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Processing...</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1 text-sm">
                          <span className="text-gray-900 font-[500]">{date.split(",")[0]}</span>
                          <span className="text-gray-500 text-xs">{date.split(",")[1]}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Pagination */}
        {filteredRecordings.length > 0 && (
          <div className="p-4 border-t border-[#ECECEC] flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="text-sm bg-gray-50 border border-[#ECECEC] rounded-lg px-2 py-1 text-gray-700 focus:outline-none"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {Math.min((page - 1) * pageSize + 1, filteredRecordings.length)} - {Math.min(page * pageSize, filteredRecordings.length)} of {filteredRecordings.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedCallId && (
        <CallDetailDrawer 
          callId={selectedCallId} 
          onClose={() => setSelectedCallId(null)} 
        />
      )}
    </div>
  );
}
