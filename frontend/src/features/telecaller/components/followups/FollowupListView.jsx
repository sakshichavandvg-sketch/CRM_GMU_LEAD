import React from "react";
import FollowupCard from "./FollowupCard";
import EmptyFollowups from "./EmptyFollowups";

export default function FollowupListView({ followups, onReschedule, onComplete, activeTab }) {
  if (!followups || followups.length === 0) {
    return <EmptyFollowups type={["today", "completed", "upcoming", "overdue"].includes(activeTab) ? activeTab : "no_results"} />;
  }

  return (
    <div className="pb-8 pt-4 w-full">
      <div className="flex flex-col gap-4 w-full">
        {followups.map((followup) => (
          <FollowupCard 
            key={followup.id} 
            followup={followup} 
            onReschedule={onReschedule} 
            onComplete={onComplete}
          />
        ))}
      </div>
    </div>
  );
}
