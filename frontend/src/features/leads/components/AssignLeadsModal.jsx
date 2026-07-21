import React from "react";
import Modal from "@/components/ui/Modal";
import { UserCheck } from "lucide-react";
import { useConfirm } from "@/hooks/useConfirm";

export default function AssignLeadsModal({ open, onClose, telecallers, onAssign, isAssigning, selectedCount }) {
  const confirm = useConfirm();
  return (
    <Modal open={open} onClose={onClose} title="Intelligent Lead Assignment" size="md">
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gray-500 mb-2">
          Assigning <span className="font-semibold text-gray-800">{selectedCount}</span> selected lead(s)
        </p>
        
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Telecaller Availability
        </h3>
        
        <div className="flex flex-col gap-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
          {telecallers?.length > 0 ? (
            telecallers.map((tc) => {
              // Extract initials for the avatar
              const initials = tc.name
                ? tc.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                : "TC";
                
              return (
                <div 
                  key={tc.id || tc.empId} 
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-[#6F1D28]/30 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
                      {initials}
                    </div>
                    
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
                        title: "Assign Selected Leads?",
                        description: "Selected leads will be assigned to the chosen telecaller.",
                        confirmText: "Assign",
                        variant: "primary"
                      });
                      
                      if (isConfirmed) {
                        onAssign(tc.id || tc.empId);
                        onClose();
                      }
                    }}
                    disabled={isAssigning}
                    className="px-5 py-2 bg-[#9E5A02] hover:bg-[#824901] text-white text-sm font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isAssigning ? "Assigning..." : "Assign Here"}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-sm text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
              No telecallers available.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
