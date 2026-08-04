import React from "react";

export default function UserPagination({ 
  totalResults = 0, 
  currentCount = 0, 
  hasNextPage, 
  fetchNextPage,
  isFetchingNextPage
}) {
  return (
    <div className="px-6 py-4 flex items-center justify-between border-t border-[#E8EAF2] bg-white rounded-b-card">
      <div className="flex items-center gap-2 text-on-surface-variant/70 font-table-body text-sm">
        <span className="material-symbols-outlined text-lg">description</span>
        Showing 1 to {currentCount} of {totalResults} results
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <select className="appearance-none h-10 pl-4 pr-8 bg-white border border-[#E8EAF2] rounded-lg text-sm text-on-surface focus:ring-1 focus:ring-primary outline-none">
            <option>10 per page</option>
            <option>25 per page</option>
            <option>50 per page</option>
          </select>
          <span className="material-symbols-outlined text-lg text-on-surface-variant/60 -ml-8 pointer-events-none">expand_more</span>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-[#E8EAF2] text-on-surface-variant hover:bg-surface-container transition-all opacity-50 cursor-not-allowed">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold ambient-shadow">
            1
          </button>
          
          <button 
            onClick={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className={`w-10 h-10 rounded-lg flex items-center justify-center border border-[#E8EAF2] text-on-surface-variant transition-all ${
              hasNextPage ? 'hover:bg-surface-container cursor-pointer' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined">
              {isFetchingNextPage ? 'hourglass_empty' : 'chevron_right'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
