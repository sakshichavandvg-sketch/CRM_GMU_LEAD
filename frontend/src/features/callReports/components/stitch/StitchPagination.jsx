import React from "react";

export default function StitchPagination({ 
  currentPage, 
  pageSize, 
  totalItems, 
  totalPages, 
  onPageChange, 
  onPageSizeChange 
}) {
  const startItem = totalItems === 0 ? 0 : currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

  // Generate page numbers
  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  // Simple truncation for many pages (just displaying first few and last, or just all if < 7)
  let visiblePages = pages;
  let showEllipsis = false;
  if (totalPages > 7) {
    if (currentPage < 4) {
      visiblePages = [0, 1, 2, 3, 4, totalPages - 1];
      showEllipsis = true;
    } else if (currentPage > totalPages - 5) {
      visiblePages = [0, totalPages - 5, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1];
      showEllipsis = true;
    } else {
      visiblePages = [0, currentPage - 1, currentPage, currentPage + 1, totalPages - 1];
      showEllipsis = true;
    }
  }

  return (
    <footer className="px-6 py-4 flex items-center justify-between border-t border-outline-variant bg-surface-container-low">
      <div className="flex items-center gap-4">
        <p className="text-on-surface-variant font-body-md text-body-md flex items-center gap-2">
          <span className="material-symbols-outlined text-outline">description</span>
          Showing {startItem} to {endItem} of {totalItems} results
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="text-on-surface-variant text-label-sm">Rows per page:</span>
          <div className="relative">
            <select 
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="pl-3 pr-8 py-1.5 rounded-lg border border-outline-variant bg-white text-label-sm appearance-none outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-sm pointer-events-none">expand_more</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            disabled={currentPage === 0}
            onClick={() => onPageChange(currentPage - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-standard disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          
          {visiblePages.map((page, index) => {
            // Check if we need to render an ellipsis
            if (showEllipsis && index > 0 && visiblePages[index] - visiblePages[index - 1] > 1) {
              return (
                <React.Fragment key={`ellipsis-${page}`}>
                  <span className="px-2 text-on-surface-variant">...</span>
                  <button 
                    onClick={() => onPageChange(page)}
                    className={page === currentPage 
                      ? "w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-label-sm"
                      : "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-standard text-label-sm"
                    }
                  >
                    {page + 1}
                  </button>
                </React.Fragment>
              );
            }
            return (
              <button 
                key={page}
                onClick={() => onPageChange(page)}
                className={page === currentPage 
                  ? "w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-label-sm"
                  : "w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-standard text-label-sm"
                }
              >
                {page + 1}
              </button>
            );
          })}

          <button 
            disabled={currentPage >= totalPages - 1}
            onClick={() => onPageChange(currentPage + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-highest transition-standard disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
