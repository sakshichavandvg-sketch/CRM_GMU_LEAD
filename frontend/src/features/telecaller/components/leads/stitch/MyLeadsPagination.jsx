import React from "react";

export default function MyLeadsPagination({
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange
}) {
  const startItem = totalItems === 0 ? 0 : currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

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
    <div className="px-6 py-4 flex items-center justify-between border-t border-outline-variant/30 bg-surface-container-lowest rounded-b-xl">
      <span className="text-body-sm text-on-surface-variant">Showing {startItem} to {endItem} of {totalItems} leads</span>
      <div className="flex items-center gap-4">
        <span className="text-body-sm text-on-surface-variant">Rows per page</span>
        <select 
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border border-outline-variant/50 rounded px-2 py-1 text-body-sm bg-background outline-none cursor-pointer"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
        
        <div className="flex items-center gap-1 ml-4">
          <button 
            disabled={currentPage === 0}
            onClick={() => onPageChange(currentPage - 1)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-variant text-on-surface-variant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          
          {visiblePages.map((page, index) => {
            if (showEllipsis && index > 0 && visiblePages[index] - visiblePages[index - 1] > 1) {
              return (
                <React.Fragment key={`ellipsis-${page}`}>
                  <span className="px-1 text-on-surface-variant">...</span>
                  <button 
                    onClick={() => onPageChange(page)}
                    className={page === currentPage 
                      ? "w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold text-sm"
                      : "w-8 h-8 flex items-center justify-center rounded hover:bg-surface-variant text-on-surface-variant transition-colors text-sm"
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
                  ? "w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold text-sm"
                  : "w-8 h-8 flex items-center justify-center rounded hover:bg-surface-variant text-on-surface-variant transition-colors text-sm"
                }
              >
                {page + 1}
              </button>
            );
          })}

          <button 
            disabled={currentPage >= totalPages - 1}
            onClick={() => onPageChange(currentPage + 1)}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-variant text-on-surface-variant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
