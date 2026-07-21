export default function TimelineItem({ event }) {
  if (!event) return null;
  const { title, description, timestamp, actor, type } = event;

  const formattedTime = timestamp ? new Date(timestamp).toLocaleString() : "Unknown time";

  return (
    <div className="relative pl-6 pb-6 border-l-2 border-gray-200 last:border-transparent last:pb-0">
      <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-sm" />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-900">{title || type || "Activity"}</span>
          {type && (
            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
              {type}
            </span>
          )}
        </div>
        {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 font-medium">
          {actor && <span>By {actor}</span>}
          {actor && <span>•</span>}
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
