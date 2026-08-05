import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function MyLeadsFilterToolbar({ hasActiveFilters = false, activeFiltersCount = 0, onOpenFilters }) {
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
          onClick={onOpenFilters}
          className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-primary text-primary font-title-sm font-semibold rounded-lg hover:bg-primary hover:text-white transition-all relative h-full"
        >
          <span className="material-symbols-outlined">filter_list</span>
          Filters {hasActiveFilters && activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-error rounded-full border-2 border-surface"></span>
          )}
        </button>
      </div>
    </div>
  );
}
