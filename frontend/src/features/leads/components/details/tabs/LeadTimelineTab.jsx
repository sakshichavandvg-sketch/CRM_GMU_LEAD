import React from 'react';
import TimelineItem from "../timeline/TimelineItem";

const MemoizedTimelineItem = React.memo(TimelineItem);

export default function LeadTimelineTab({ data }) {
  // data here represents the normalized timeline array from the view model
  // If this tab later owns its own hook, we would fetch here and use its data
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
