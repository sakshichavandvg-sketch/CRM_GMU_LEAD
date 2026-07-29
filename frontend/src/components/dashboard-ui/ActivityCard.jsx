import React from "react";
import { User } from "lucide-react";
import StatusBadge from "@/components/table/StatusBadge";

export function formatTimeAgo(date) {
  if (!date) return 'Just now';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }
  
  return date.toLocaleDateString();
}

export function ActivityCard({ activity }) {
  if (!activity) return null;

  return (
    <div className="group flex items-start gap-4 p-4 bg-white border border-[#ECECEC] rounded-[20px] transition-all duration-300 hover:shadow-md hover:border-gray-300 relative overflow-hidden">
      {/* Decorative left border accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7A1F2B] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 overflow-hidden ring-2 ring-white shadow-sm group-hover:ring-[#7A1F2B]/10 transition-all duration-300">
          <User size={18} />
        </div>
      </div>
      
      <div className="flex-1 min-w-0 pt-1">
        <div className="flex justify-between items-start gap-4 mb-1.5">
          <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug">
            {activity.description}
          </p>
          {activity.status && (
            <div className="shrink-0 mt-0.5">
              <StatusBadge status={activity.status} />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5 text-gray-700 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
            {activity.action}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            {activity.time || (activity.timestamp ? formatTimeAgo(new Date(activity.timestamp)) : 'Just now')}
          </span>
        </div>
      </div>
    </div>
  );
}
