import { User, Phone, Edit, Calendar, CheckCircle, FileText, Bell } from "lucide-react";

const TYPE_CONFIG = {
  call:    { icon: <Phone    className="w-3.5 h-3.5" />, dot: "bg-emerald-500", ring: "bg-emerald-100 text-emerald-600" },
  status:  { icon: <Edit     className="w-3.5 h-3.5" />, dot: "bg-blue-500",    ring: "bg-blue-100 text-blue-600"    },
  assign:  { icon: <User     className="w-3.5 h-3.5" />, dot: "bg-purple-500",  ring: "bg-purple-100 text-purple-600"},
  confirm: { icon: <CheckCircle className="w-3.5 h-3.5"/>, dot: "bg-teal-500", ring: "bg-teal-100 text-teal-600"    },
  note:    { icon: <FileText className="w-3.5 h-3.5" />, dot: "bg-amber-500",   ring: "bg-amber-100 text-amber-600" },
  followup:{ icon: <Bell     className="w-3.5 h-3.5" />, dot: "bg-rose-500",    ring: "bg-rose-100 text-rose-600"   },
  default: { icon: <Calendar className="w-3.5 h-3.5" />, dot: "bg-gray-400",   ring: "bg-gray-100 text-gray-500"   },
};

const getTypeConfig = (type) => {
  const t = (type || "").toLowerCase();
  if (t.includes("call"))     return TYPE_CONFIG.call;
  if (t.includes("status"))   return TYPE_CONFIG.status;
  if (t.includes("assign"))   return TYPE_CONFIG.assign;
  if (t.includes("confirm"))  return TYPE_CONFIG.confirm;
  if (t.includes("note"))     return TYPE_CONFIG.note;
  if (t.includes("follow"))   return TYPE_CONFIG.followup;
  return TYPE_CONFIG.default;
};

const formatRelativeTime = (timestamp) => {
  if (!timestamp) return "Unknown time";
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

export default function TimelineItem({ event }) {
  if (!event) return null;
  const { title, description, timestamp, actor, type, outcome, duration } = event;

  const cfg = getTypeConfig(type);
  const relativeTime = formatRelativeTime(timestamp);
  const absoluteTime = timestamp ? new Date(timestamp).toLocaleString("en-IN", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
  }) : "";

  return (
    <div className="relative pl-8 pb-7 last:pb-0 group">
      {/* Connecting line */}
      <span className="absolute left-[11px] top-7 bottom-0 w-[2px] bg-gray-100 group-last:hidden" />

      {/* Dot */}
      <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm border-2 border-white ${cfg.ring}`}>
        {cfg.icon}
      </div>

      {/* Card */}
      <div className="ml-2 bg-white border border-[#ECECEC] rounded-[14px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-shadow">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[13px] font-bold text-gray-900">
              {title || type || "Activity"}
            </span>
            {type && (
              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${cfg.ring}`}>
                {type}
              </span>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="text-[12px] font-semibold text-gray-500">{relativeTime}</div>
            {absoluteTime && (
              <div className="text-[11px] text-gray-400 mt-0.5">{absoluteTime}</div>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-[13px] text-gray-600 leading-relaxed mt-1">{description}</p>
        )}

        {/* Sub-details: outcome + duration */}
        {(outcome || duration) && (
          <div className="flex items-center gap-4 mt-2 pt-2 border-t border-gray-50">
            {outcome && (
              <span className="text-[11px] font-semibold text-gray-500">
                Outcome: <span className="text-gray-800">{outcome}</span>
              </span>
            )}
            {duration && (
              <span className="text-[11px] font-semibold text-gray-500">
                Duration: <span className="text-gray-800">{duration}</span>
              </span>
            )}
          </div>
        )}

        {/* Actor */}
        {actor && (
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600 shrink-0">
              {actor.charAt(0).toUpperCase()}
            </div>
            <span className="text-[11px] text-gray-500 font-medium">{actor}</span>
          </div>
        )}
      </div>
    </div>
  );
}

