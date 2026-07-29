import React, { useState, useMemo } from "react";
import { Search, Phone } from "lucide-react";
import { useVoice } from "../context/VoiceProvider";
import { VOICE_STATES } from "../utils/twilioEvents";
import { useTelecallerLeads } from "../../hooks/useMyLeads";

export default function QuickDialCard() {
  const voiceCtx = useVoice();
  const voiceState = voiceCtx?.voiceState || "IDLE";

  const { selectedLead, setSelectedLead } = voiceCtx;

  const [mode, setMode] = useState("search"); // "search" | "manual"
  const [searchQuery, setSearchQuery] = useState(selectedLead?.name || "");
  const [manualPhone, setManualPhone] = useState("");

  const { data: leadsData } = useTelecallerLeads({}, 0, 200);
  const allLeads = leadsData?.leads || [];

  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return allLeads
      .filter(l =>
        l.name?.toLowerCase().includes(q) ||
        l.mobileNo?.includes(q) ||
        l.enquiryNo?.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [allLeads, searchQuery]);

  const isBusy =
    voiceState === VOICE_STATES.CONNECTING ||
    voiceState === VOICE_STATES.CONNECTED ||
    voiceState === VOICE_STATES.RINGING;

  const isReady = voiceState === VOICE_STATES.READY;

  const handleSelectLead = (lead) => {
    setSelectedLead({
      ...lead,
      phone: lead.mobileNo
    });
    setSearchQuery(lead.name || "");
  };

  const handleCall = () => {
    if (!isReady) {
      alert("Twilio Device is not ready yet. Please check your token or connection status.");
      return;
    }

    if (mode === "search" && selectedLead) {
      voiceCtx?.startCall(selectedLead.enquiryNo, selectedLead.phone);
    } else if (mode === "search" && !selectedLead && manualPhone.trim().length >= 10) {
      voiceCtx?.startCall(null, manualPhone.trim());
    } else if (mode === "manual" && manualPhone.trim().length >= 10) {
      voiceCtx?.startCall(null, manualPhone.trim());
    } else {
      alert("Please select a lead or enter a valid 10-digit phone number.");
    }
  };

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col">
      <h2 className="text-[15px] font-[700] text-gray-900 mb-4">Quick Dial</h2>

      {/* Tabs — Search Lead | Enter Number */}
      <div className="flex border-b border-[#ECECEC] mb-5">
        <button
          onClick={() => { setMode("search"); setSelectedLead(null); }}
          className={`pb-2.5 px-1 mr-6 text-[13px] font-[600] border-b-2 transition-colors ${
            mode === "search"
              ? "border-[#7A1F2B] text-[#7A1F2B]"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          Search Lead
        </button>
        <button
          onClick={() => { setMode("manual"); setSelectedLead(null); }}
          className={`pb-2.5 px-1 text-[13px] font-[600] border-b-2 transition-colors ${
            mode === "manual"
              ? "border-[#7A1F2B] text-[#7A1F2B]"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          Enter Number
        </button>
      </div>

      {/* Search Mode */}
      {mode === "search" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedLead(null);
              }}
              placeholder="Search by name, phone or enquiry no..."
              className="w-full text-[13px] bg-white border border-[#ECECEC] rounded-xl pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/15 focus:border-[#7A1F2B]/30 transition-all"
            />
            <Search size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
          </div>

          {/* Autocomplete */}
          {searchQuery.length > 1 && !selectedLead && searchResults.length > 0 && (
            <div className="bg-white border border-[#ECECEC] rounded-xl shadow-lg max-h-[160px] overflow-y-auto">
              {searchResults.map((lead) => (
                <button
                  key={lead.enquiryNo}
                  onClick={() => handleSelectLead(lead)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-[#F5F5F5] last:border-0"
                >
                  <div className="w-8 h-8 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center text-xs font-[700] shrink-0">
                    {(lead.name || "?")[0]}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-[600] text-gray-900 truncate">{lead.name}</span>
                    <span className="text-[11px] text-gray-500">{lead.mobileNo}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[#ECECEC]" />
            <span className="text-[11px] text-gray-400 font-[500]">or</span>
            <div className="flex-1 h-px bg-[#ECECEC]" />
          </div>

          {/* Phone Number input always visible in search mode too */}
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={manualPhone}
              onChange={(e) => setManualPhone(e.target.value.replace(/[^0-9+]/g, ""))}
              placeholder="Enter phone number"
              maxLength={15}
              className="w-full text-[13px] bg-white border border-[#ECECEC] rounded-xl pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/15 focus:border-[#7A1F2B]/30 transition-all font-mono"
            />
          </div>

          {/* Selected Lead Preview */}
          {selectedLead && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-[#ECECEC]">
              <div className="w-9 h-9 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center font-[700] text-sm shrink-0">
                {(selectedLead.name || "?")[0]}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-[600] text-gray-900 truncate">{selectedLead.name}</span>
                <span className="text-[11px] text-gray-500">{selectedLead.phone}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual Mode */}
      {mode === "manual" && (
        <div className="flex flex-col gap-4 flex-1">
          <div className="relative">
            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={manualPhone}
              onChange={(e) => setManualPhone(e.target.value.replace(/[^0-9+]/g, ""))}
              placeholder="Enter phone number"
              maxLength={15}
              className="w-full text-[13px] bg-white border border-[#ECECEC] rounded-xl pl-10 pr-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/15 focus:border-[#7A1F2B]/30 transition-all font-mono"
            />
          </div>
        </div>
      )}

      {/* Call Button */}
      <button
        onClick={handleCall}
        disabled={isBusy}
        className={`mt-5 w-full flex items-center justify-center gap-2 font-[600] text-[13px] py-3 rounded-xl transition-all shadow-sm ${
          isBusy 
            ? "bg-gray-400 text-white cursor-not-allowed" 
            : "bg-[#7A1F2B] hover:bg-[#6a1b26] text-white"
        }`}
      >
        <Phone size={16} />
        {isBusy ? "Call in Progress..." : "Call Lead"}
      </button>
    </div>
  );
}
