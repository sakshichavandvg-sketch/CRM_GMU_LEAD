"use client";

import React, { useState } from "react";
import DashboardShell from "@/components/layout/DashboardShell";
import { useFollowups } from "@/features/telecaller/hooks/useFollowups";
import { useFollowupWorkspace } from "@/features/telecaller/hooks/useFollowupWorkspace";

import FollowupListView from "@/features/telecaller/components/followups/FollowupListView";
import FollowupCalendarView from "@/features/telecaller/components/followups/FollowupCalendarView";
import WorkspaceControls from "@/features/telecaller/components/followups/WorkspaceControls";
import ReusableFilterDrawer from "@/components/layout/ReusableFilterDrawer";
import RescheduleModal from "@/features/telecaller/components/followups/RescheduleModal";
import ScheduleFollowupModal from "@/features/telecaller/components/followups/ScheduleFollowupModal";
import EmptyFollowups from "@/features/telecaller/components/followups/EmptyFollowups";
import Button from "@/components/ui/Button";

export default function FollowUpsPage() {
  // Fetch data
  const { data: allFollowupsData, isLoading } = useFollowups("all");
  const allFollowups = Array.isArray(allFollowupsData) ? allFollowupsData : [];

  // Workspace UI State & Derived Filtered Data
  const workspace = useFollowupWorkspace(allFollowups);

  // Modals state
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [rescheduleData, setRescheduleData] = useState(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleDefaultDate, setScheduleDefaultDate] = useState("");

  const handleOpenReschedule = (followup) => setRescheduleData(followup);
  const handleCloseReschedule = () => setRescheduleData(null);

  const handleOpenSchedule = (date) => {
    console.log("[FollowUpsPage] handleOpenSchedule called", { date, selectedCalendarDay: workspace.selectedCalendarDay });
    setScheduleDefaultDate(date || "");
    setIsScheduleOpen(true);
  };
  const handleCloseSchedule = () => setIsScheduleOpen(false);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto relative custom-scrollbar pb-8">
        
        <div className="max-w-[1200px] mx-auto w-full px-6">
          {/* Sticky Controls Section */}
          <div className="sticky top-0 z-20 bg-white pb-3 pt-6">
            <WorkspaceControls 
              workspace={workspace} 
              onOpenFilters={() => setFilterDrawerOpen(true)}
            />
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-3"></div>
          </div>

          {/* Content Section */}
          <div className="pt-4 min-h-[500px]">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7A1F2B]"></div>
              </div>
            ) : (
              workspace.viewMode === "list" ? (
                <FollowupListView 
                  followups={workspace.displayFollowups} 
                  onReschedule={handleOpenReschedule}
                  activeTab={workspace.activeTab}
                />
              ) : (
                // Calendar mode: two separate cards (left calendar ~40%, right follow-up list ~60%)
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-[40%] w-full bg-white border border-[#ECECEC] rounded-2xl p-4 shadow-sm">
                    <FollowupCalendarView 
                      followups={workspace.filteredFollowups}
                      selectedDate={workspace.selectedCalendarDay}
                      onSelectDate={(d) => workspace.setSelectedCalendarDay(d)}
                      onSchedule={handleOpenSchedule}
                    />
                  </div>

                  <div className="lg:w-[60%] w-full bg-white border border-[#ECECEC] rounded-2xl p-4 shadow-sm flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-[700] text-gray-900">{workspace.selectedCalendarDay ? new Date(workspace.selectedCalendarDay).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}</h3>
                        <p className="text-sm text-slate-500">{workspace.selectedCalendarDay ? `${workspace.filteredFollowups.filter(f => (f.scheduledDate || f.date) === workspace.selectedCalendarDay).length} follow-up${workspace.filteredFollowups.filter(f => (f.scheduledDate || f.date) === workspace.selectedCalendarDay).length !== 1 ? 's' : ''}` : 'No date selected'}</p>
                      </div>
                      <div className="ml-3">
                        <Button onClick={() => handleOpenSchedule(workspace.selectedCalendarDay)} className="bg-[#7A1F2B] hover:bg-[#6F1D28] text-white">Schedule Follow-up</Button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                      {(!workspace.selectedCalendarDay || workspace.filteredFollowups.filter(f => (f.scheduledDate || f.date) === workspace.selectedCalendarDay).length === 0) ? (
                        <div>
                          <EmptyFollowups type={workspace.selectedCalendarDay ? 'empty_day' : 'no_results'} />
                        </div>
                      ) : (
                        <FollowupListView 
                          followups={workspace.filteredFollowups.filter(f => (f.scheduledDate || f.date) === workspace.selectedCalendarDay)}
                          onReschedule={handleOpenReschedule}
                          activeTab={workspace.activeTab}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <ReusableFilterDrawer 
        isOpen={isFilterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        title="Refine Follow-ups"
        onApply={() => setFilterDrawerOpen(false)}
        onReset={() => workspace.setFilters({ priority: "", course: "", status: "", source: "", assignedCounselor: "", date: "" })}
      >
        <div className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Priority</label>
            <select
              value={workspace.filters.priority}
              onChange={(e) => workspace.setFilters({...workspace.filters, priority: e.target.value})}
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F1D28]"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course</label>
            <select
              value={workspace.filters.course}
              onChange={(e) => workspace.setFilters({...workspace.filters, course: e.target.value})}
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F1D28]"
            >
              <option value="">All Courses</option>
              <option value="B.Tech">B.Tech</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
            <select
              value={workspace.filters.status}
              onChange={(e) => workspace.setFilters({...workspace.filters, status: e.target.value})}
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F1D28]"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Source</label>
            <select
              value={workspace.filters.source}
              onChange={(e) => workspace.setFilters({...workspace.filters, source: e.target.value})}
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F1D28]"
            >
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="Walk-in">Walk-in</option>
              <option value="Referral">Referral</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Assigned Counselor</label>
            <select
              value={workspace.filters.assignedCounselor}
              onChange={(e) => workspace.setFilters({...workspace.filters, assignedCounselor: e.target.value})}
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F1D28]"
            >
              <option value="">Any Counselor</option>
              {/* Typically these would come from an API, hardcoding a few for UI purposes */}
              <option value="Sarah Jenkins">Sarah Jenkins</option>
              <option value="Michael Scott">Michael Scott</option>
              <option value="Priya Sharma">Priya Sharma</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Specific Date</label>
            <input
              type="date"
              value={workspace.filters.date}
              onChange={(e) => workspace.setFilters({...workspace.filters, date: e.target.value})}
              className="w-full h-10 px-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F1D28]"
            />
          </div>
        </div>
      </ReusableFilterDrawer>

      <RescheduleModal 
        isOpen={!!rescheduleData}
        onClose={handleCloseReschedule}
        followup={rescheduleData}
      />

      <ScheduleFollowupModal 
        isOpen={isScheduleOpen}
        onClose={handleCloseSchedule}
        defaultDate={scheduleDefaultDate}
        existingFollowups={workspace.filteredFollowups.filter(f => (f.scheduledDate || f.date) === scheduleDefaultDate)}
      />
    </div>
  );
}
