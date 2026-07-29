import React, { useState } from "react";
import { X, User, Phone, Mail, Clock, CheckCircle2, ChevronRight, Mic, StickyNote, Activity, AlertCircle, Copy, Download, ExternalLink } from "lucide-react";
import { useVoice } from "../context/VoiceProvider";
import { useCallDetails } from "../../hooks/useCalls";
import { useLeadTimeline } from "../../hooks/useLeadTimeline";
import RecordingPlayer from "./RecordingPlayer";
import { getOutcomeStyle, formatCallDate, formatDuration, getCallDirection, getInitials } from "../utils/callMapper";
import Button from "@/components/ui/Button";

const DrawerSkeleton = () => (
  <div className="p-6 space-y-8 animate-pulse">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-100" />
      <div className="space-y-2">
        <div className="w-32 h-6 bg-gray-100 rounded" />
        <div className="w-24 h-4 bg-gray-100 rounded" />
      </div>
    </div>
    <div className="space-y-4">
      <div className="w-full h-24 bg-gray-100 rounded-xl" />
      <div className="w-full h-32 bg-gray-100 rounded-xl" />
      <div className="w-full h-40 bg-gray-100 rounded-xl" />
    </div>
  </div>
);

export default function CallDetailDrawer({ callId, onClose }) {
  const { data: call, isLoading: isCallLoading } = useCallDetails(callId);
  const enquiryNo = call?.enquiryNo;
  const { data: timelineData, isLoading: isTimelineLoading } = useLeadTimeline(enquiryNo);

  const [copied, setCopied] = useState(false);

  const handleCopyLink = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!callId) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ECECEC]">
          <h3 className="text-lg font-[700] text-gray-900">Call Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {isCallLoading ? (
            <DrawerSkeleton />
          ) : call ? (
            <div className="p-6 space-y-8">
              
              {/* 1. Lead Section */}
              <section>
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center text-xl font-[700] shrink-0 shadow-sm">
                    {getInitials(call.leadName || call.name)}
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-[700] text-gray-900 leading-tight mb-1">
                      {call.leadName || call.name || "Unknown"}
                    </h2>
                    <span className="text-sm font-[500] text-gray-500 mb-2">{call.enquiryNo || "No Enquiry Number"}</span>
                    <span className="inline-flex items-center w-fit px-2.5 py-0.5 rounded text-[11px] font-[600] bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                      {call.leadStatus || "Lead"}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl border border-[#ECECEC] p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700 font-mono">{call.phone || call.leadPhone || "N/A"}</span>
                  </div>
                  {call.email && (
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700">{call.email}</span>
                    </div>
                  )}
                </div>
              </section>

              {/* 2. Call Section */}
              <section>
                <h4 className="text-sm font-[700] text-gray-900 mb-3 flex items-center gap-2">
                  <Phone size={16} className="text-gray-400" />
                  Call Summary
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white border border-[#ECECEC] rounded-xl p-3">
                    <span className="text-xs text-gray-500 block mb-1">Outcome</span>
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[12px] font-[600] border ${getOutcomeStyle(call.callOutcome || call.outcome).bg} ${getOutcomeStyle(call.callOutcome || call.outcome).text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getOutcomeStyle(call.callOutcome || call.outcome).dot}`} />
                      {call.callOutcome || call.outcome}
                    </span>
                  </div>
                  <div className="bg-white border border-[#ECECEC] rounded-xl p-3">
                    <span className="text-xs text-gray-500 block mb-1">Duration</span>
                    <span className="text-sm font-mono text-gray-900 font-[600]">
                      {formatDuration(call.callDuration || call.duration || 0)}
                    </span>
                  </div>
                  <div className="bg-white border border-[#ECECEC] rounded-xl p-3">
                    <span className="text-xs text-gray-500 block mb-1">Direction</span>
                    <span className="text-sm text-gray-900 font-[500]">
                      {getCallDirection(call)}
                    </span>
                  </div>
                  <div className="bg-white border border-[#ECECEC] rounded-xl p-3">
                    <span className="text-xs text-gray-500 block mb-1">Date</span>
                    <span className="text-xs text-gray-900 font-[500]">
                      {formatCallDate(call.callDateTime || call.createdAt || call.date)}
                    </span>
                  </div>
                </div>
              </section>

              {/* 3. Recording Section */}
              {(call.recordingUrl || call.recording_url) && (
                <section>
                  <h4 className="text-sm font-[700] text-gray-900 mb-3 flex items-center gap-2">
                    <Mic size={16} className="text-gray-400" />
                    Recording
                  </h4>
                  <div className="bg-gray-50 border border-[#ECECEC] rounded-xl p-4">
                    <RecordingPlayer 
                      src={`/api/leads/telecaller/calls/${callId}/recording`} 
                      duration={call.callDuration || call.duration || 0} 
                    />
                    
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#ECECEC]">
                      <a
                        href={`/api/leads/telecaller/calls/${callId}/recording`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        <ExternalLink size={14} /> Open
                      </a>
                      <a
                        href={`/api/leads/telecaller/calls/${callId}/recording`}
                        download
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        <Download size={14} /> Download
                      </a>
                      <button
                        onClick={() => handleCopyLink(`${window.location.origin}/api/leads/telecaller/calls/${callId}/recording`)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-[600] text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        {copied ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />} 
                        {copied ? "Copied" : "Copy URL"}
                      </button>
                    </div>
                  </div>
                </section>
              )}

              {/* 4. Notes Section */}
              {call.notes && (
                <section>
                  <h4 className="text-sm font-[700] text-gray-900 mb-3 flex items-center gap-2">
                    <StickyNote size={16} className="text-gray-400" />
                    Call Notes
                  </h4>
                  <div className="bg-yellow-50/50 border border-yellow-100 rounded-xl p-4">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{call.notes}</p>
                  </div>
                </section>
              )}

              {/* 5. Timeline Section */}
              <section>
                <h4 className="text-sm font-[700] text-gray-900 mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-gray-400" />
                  Lead History
                </h4>
                
                {isTimelineLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-3 animate-pulse">
                        <div className="w-2 h-2 mt-2 rounded-full bg-gray-200 shrink-0" />
                        <div className="w-full h-12 bg-gray-100 rounded-lg" />
                      </div>
                    ))}
                  </div>
                ) : timelineData && timelineData.length > 0 ? (
                  <div className="relative pl-3 space-y-4">
                    <div className="absolute left-[3px] top-2 bottom-2 w-px bg-gray-200" />
                    {timelineData.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="relative flex gap-4">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 border-2 border-white ring-1 ring-blue-100 z-10 -ml-[7px]" />
                        <div>
                          <p className="text-[13px] font-[600] text-gray-900">{item.title || item.action || "Activity"}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description || item.comment || ""}</p>
                          <span className="text-[10px] font-mono text-gray-400 mt-1 block">
                            {formatCallDate(item.createdAt || item.date)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-xl border border-[#ECECEC] border-dashed">
                    <AlertCircle size={20} className="mx-auto text-gray-300 mb-2" />
                    <p className="text-sm font-[500] text-gray-500">No Lead Activity</p>
                  </div>
                )}
              </section>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <AlertCircle size={32} className="text-red-400 mb-3" />
              <p className="text-sm font-[600] text-gray-900">Failed to load call details</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {call && (
          <div className="p-4 border-t border-[#ECECEC] bg-gray-50 flex gap-3">
            <Button
              variant="outline"
              className="flex-1 justify-center bg-white"
              onClick={() => {
                if (call.enquiryNo) {
                  window.location.href = `/telecaller/leads/${call.enquiryNo}`;
                }
              }}
            >
              View Full Lead
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
