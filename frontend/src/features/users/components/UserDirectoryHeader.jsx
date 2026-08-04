import React from "react";

export default function UserDirectoryHeader({ onAddClick }) {
  return (
    <header className="flex justify-between items-center px-page-padding py-stack-md w-full bg-surface">
      <div className="flex flex-col">
        <h2 className="font-title-main text-title-main text-on-surface font-bold leading-tight">Telecaller Directory</h2>
        <p className="font-subtitle text-body-sm text-on-surface-variant/80">Manage telecallers, assignments and account access.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-4">
          <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant">
            {/* Empty in HTML but matches structure */}
          </button>
        </div>
        <div className="relative group">
          <button 
            onClick={onAddClick}
            className="bg-primary-container text-on-tertiary font-button-text text-button-text h-[52px] px-6 rounded-card flex items-center gap-2 hover:opacity-90 transition-all active:scale-95"
          >
            <span>+ Add Telecaller</span>
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
        </div>
      </div>
    </header>
  );
}
