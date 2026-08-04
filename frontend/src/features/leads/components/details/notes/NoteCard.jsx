import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function NoteCard({ note, onEditNote, onDeleteNote }) {
  if (!note) return null;
  const { id, _id, author = "Unknown User", createdBy, createdAt, content } = note;
  const noteId = id || _id;
  const noteAuthor = author || createdBy || "Unknown User";

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(content || "");
  const [isSaving, setIsSaving] = useState(false);

  const formattedTime = createdAt ? new Date(createdAt).toLocaleString("en-IN", {
    day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
  }) : "Unknown time";
  const initials = noteAuthor.substring(0, 2).toUpperCase();

  const handleSave = async () => {
    if (!editedText.trim() || !onEditNote) return;
    try {
      setIsSaving(true);
      await onEditNote(noteId, editedText);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

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
              <span className="text-[13px] font-bold text-gray-900">{noteAuthor}</span>
              <span className="text-[11px] text-gray-400 font-medium">{formattedTime}</span>
            </div>
            {/* Action buttons */}
            {onEditNote && !isEditing && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  title="Edit note"
                  onClick={() => {
                    setEditedText(content || "");
                    setIsEditing(true);
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                {onDeleteNote && (
                  <button
                    type="button"
                    title="Delete note"
                    onClick={() => onDeleteNote(noteId)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full p-2 border border-amber-300 rounded-lg text-[13px] text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                  className="px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-amber-100/50 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving || !editedText.trim()}
                  className="px-3 py-1 text-xs font-semibold text-white bg-[#8F111B] hover:bg-[#6F1018] rounded-md shadow-sm transition-colors flex items-center gap-1"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[13px] text-gray-800 whitespace-pre-wrap leading-relaxed">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
