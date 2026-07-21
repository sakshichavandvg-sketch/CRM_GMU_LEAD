import { useState } from "react";
import { X } from "lucide-react";

export default function SelectionToolbar({ selectedCount, onClear, telecallers = [], onAssign, isAssigning }) {
  const [selectedTelecaller, setSelectedTelecaller] = useState("");

  if (selectedCount === 0) return null;

  const handleAssign = () => {
    if (selectedTelecaller) {
      onAssign(selectedTelecaller);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full border border-gray-200 bg-white/90 px-6 py-3 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-2 border-r border-gray-200 pr-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6F1D28] text-xs font-bold text-white">
          {selectedCount}
        </span>
        <span className="text-sm font-medium text-gray-700">Leads Selected</span>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={selectedTelecaller}
          onChange={(e) => setSelectedTelecaller(e.target.value)}
          className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-[#6F1D28] focus:outline-none focus:ring-1 focus:ring-[#6F1D28]"
        >
          <option value="">Select Telecaller...</option>
          {telecallers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          disabled={!selectedTelecaller || isAssigning}
          className="h-9 rounded-lg bg-[#6F1D28] px-4 text-sm font-medium text-white transition hover:bg-[#5a1720] disabled:opacity-50"
        >
          {isAssigning ? "Assigning..." : "Assign"}
        </button>
        
        <button
          onClick={onClear}
          className="flex h-9 items-center justify-center rounded-lg px-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition"
          aria-label="Clear selection"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
