import React from 'react';
import TimelineItem from "../timeline/TimelineItem";
import { useLeadTimeline } from "../../../hooks/useLeadTimeline";
import { FormSkeleton } from "@/components/ui/Skeletons";

const MemoizedTimelineItem = React.memo(TimelineItem);

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

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="pl-2 pt-2">
        {timelineEvents.map((event, index) => (
          <MemoizedTimelineItem key={event.id || index} event={event} />
        ))}
      </div>
    </div>
  );
}
