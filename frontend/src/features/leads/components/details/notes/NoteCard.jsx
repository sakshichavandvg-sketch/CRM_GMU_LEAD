import { Pencil, Trash2 } from "lucide-react";

export default function NoteCard({ note }) {
  if (!note) return null;
  const { author = "Unknown User", createdAt, content } = note;

  const formattedTime = createdAt ? new Date(createdAt).toLocaleString("en-IN", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
  }) : "Unknown time";
  const initials = author.substring(0, 2).toUpperCase();

  return (
    <div className="flex gap-4 group">
      {/* Avatar */}
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-700 shadow-sm border border-slate-200 select-none">
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="bg-amber-50/70 border border-amber-200/80 p-4 rounded-2xl rounded-tl-sm shadow-sm hover:shadow-md transition-shadow">
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-gray-900">{author}</span>
              <span className="text-[11px] text-gray-400 font-medium">{formattedTime}</span>
            </div>
            {/* Hover-reveal action buttons (UI only — no logic wired) */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                title="Edit note"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                title="Delete note"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {/* Content */}
          <p className="text-[13px] text-gray-800 whitespace-pre-wrap leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

