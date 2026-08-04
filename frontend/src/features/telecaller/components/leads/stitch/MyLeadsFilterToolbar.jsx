import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function MyLeadsFilterToolbar({ onApplyFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialSearch = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(initialSearch);

  // Sync if URL changes externally
  useEffect(() => {
    setLocalSearch(initialSearch);
  }, [initialSearch]);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);
    if (localSearch.trim()) {
      params.set("search", localSearch.trim());
    } else {
      params.delete("search");
    }
    
    // Update the URL to trigger the search (matches existing logic pattern)
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Also trigger any local apply actions if needed
    if (onApplyFilters) onApplyFilters();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  return (
    <div className="bg-surface-container-lowest premium-shadow p-4 rounded-xl mb-8 flex flex-col lg:flex-row gap-4">
      <div className="flex-1 relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
        <input 
          className="w-full pl-12 pr-4 py-3 bg-background border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-body-md" 
          placeholder="Search by name, mobile or enquiry no..." 
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={handleApply}
          className="bg-primary text-white px-8 py-2.5 rounded-lg font-title-sm font-semibold hover:bg-primary-container transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-primary/20"
        >
          <span className="material-symbols-outlined">done_all</span>
          Apply Filters
        </button>
      </div>
    </div>
  );
}
