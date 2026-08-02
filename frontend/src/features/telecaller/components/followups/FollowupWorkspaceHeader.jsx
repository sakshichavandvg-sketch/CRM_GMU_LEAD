import React from "react";
import WorkspaceControls from "./WorkspaceControls";

export default function FollowupWorkspaceHeader({ workspace, onOpenFilters }) {
  return (
    <div className="flex-none bg-white px-8 pt-6 pb-2">
      <div className="mb-4">
        <h1 className="text-2xl font-[700] text-gray-900 tracking-tight font-outfit">Follow-ups Workspace</h1>
        <p className="text-sm text-slate-500 font-[500] mt-1">Manage your pending calls and schedule your work efficiently.</p>
      </div>
      
      <WorkspaceControls workspace={workspace} onOpenFilters={onOpenFilters} />
    </div>
  );
}
