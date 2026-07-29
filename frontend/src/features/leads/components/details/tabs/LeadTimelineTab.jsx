import React from 'react';
import TimelineItem from "../timeline/TimelineItem";
import { useLeadTimeline } from "../../../hooks/useLeadTimeline";
import { FormSkeleton } from "@/components/ui/Skeletons";

const MemoizedTimelineItem = React.memo(TimelineItem);

const groupTimelineEvents = (events) => {
  const groups = {};
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  events.forEach(event => {
    const eventDate = new Date(event.timestamp);
    eventDate.setHours(0, 0, 0, 0);
    
    let groupKey;
    if (eventDate.getTime() === today.getTime()) {
      groupKey = 'Today';
    } else if (eventDate.getTime() === yesterday.getTime()) {
      groupKey = 'Yesterday';
    } else {
      groupKey = eventDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(event);
  });

  return groups;
};

export default function LeadTimelineTab({ leadId }) {
  const { data, isLoading, isError, error } = useLeadTimeline(leadId);

  if (isLoading) {
    return (
      <div className="p-5">
        <FormSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-sm text-red-500 border border-red-100 rounded-xl bg-red-50">
        {error?.response?.data?.message || "Failed to load timeline."}
      </div>
    );
  }

  const timelineEvents = Array.isArray(data) ? data : [];

  if (timelineEvents.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl bg-gray-50">
        No timeline events recorded yet.
      </div>
    );
  }

  const groupedEvents = groupTimelineEvents(timelineEvents);

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="pl-2 pt-2">
        {Object.entries(groupedEvents).map(([dateLabel, events]) => (
          <div key={dateLabel} className="mb-6 last:mb-0">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">{dateLabel}</h3>
            <div>
              {events.map((event, index) => (
                <MemoizedTimelineItem key={event.id || index} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
