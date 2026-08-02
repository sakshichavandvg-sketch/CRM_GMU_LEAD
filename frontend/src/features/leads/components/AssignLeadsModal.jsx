import React, { useState, useMemo } from "react";
import Modal from "@/components/ui/Modal";
import SearchBar from "@/components/management/SearchBar";
import Avatar from "@/components/ui/Avatar";
import { useConfirm } from "@/hooks/useConfirm";

export default function AssignLeadsModal({ 
  open, 
  onClose, 
  telecallers, 
  onAssign, 
  isAssigning, 
  selectedCount,
  mode = "assign",
  currentTelecallerId = null
}) {
  const confirm = useConfirm();
  const [search, setSearch] = useState("");

  const filteredTelecallers = useMemo(() => {
    if (!telecallers || !Array.isArray(telecallers)) return [];

    let list = telecallers.filter(
      tc => (tc.role || "").toUpperCase() === "TELECALLER" && (tc.status || "").toUpperCase() === "ACTIVE"
    );

    if (mode === "reassign" && currentTelecallerId) {
      list = list.filter(tc => tc.id !== currentTelecallerId && tc.empId !== currentTelecallerId);
    }
    
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(tc => 
        (tc.name || "").toLowerCase().includes(s) ||
        (tc.empId || "").toLowerCase().includes(s) ||
        (tc.email || "").toLowerCase().includes(s) ||
        (tc.phone || "").toLowerCase().includes(s)
      );
    }
    return list;
  }, [telecallers, search, mode, currentTelecallerId]);

  return (
    <Modal open={open} onClose={onClose} title={mode === "reassign" ? "Intelligent Lead Reassignment" : "Intelligent Lead Assignment"} size="md">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 mb-2">
          {mode === "reassign" ? "Reassigning " : "Assigning "} 
          <span className="font-semibold text-gray-800">{selectedCount}</span> selected lead(s)
        </p>

        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search telecallers..." 
        />
        
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">
          Telecaller Availability
        </h3>
        
        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-hide">
          {filteredTelecallers.length > 0 ? (
            filteredTelecallers.map((tc) => (
                <div 
                  key={tc.id} 
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-[#6F1D28]/30 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <Avatar name={tc.name} src={tc.avatar} size="lg" colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100" />
                    
                    {/* Details */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{tc.name}</span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          AVAILABLE
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span><strong className="text-gray-700">{tc.activeLeads || 0}</strong> Active Leads</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action */}
                  <button
                    onClick={async () => {
                      const isConfirmed = await confirm({
                        title: mode === "reassign" ? "Reassign Selected Leads?" : "Assign Selected Leads?",
                        description: `Selected leads will be ${mode === "reassign" ? "reassigned" : "assigned"} to the chosen telecaller.`,
                        confirmText: mode === "reassign" ? "Reassign" : "Assign",
                        variant: "primary"
                      });
                      
                      if (isConfirmed) {
                        onAssign(tc.id);
                      }
                    }}
                    disabled={isAssigning}
                    className="px-5 py-2 bg-[#9E5A02] hover:bg-[#824901] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2 shrink-0"
                  >
                    {isAssigning ? "Processing..." : mode === "reassign" ? "Reassign Here" : "Assign Here"}
                  </button>
                </div>
              ))
          ) : (
            <div className="py-8 text-center text-sm text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
              No telecallers match your search.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
