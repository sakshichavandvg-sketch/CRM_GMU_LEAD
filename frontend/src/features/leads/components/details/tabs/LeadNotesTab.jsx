import React from 'react';
import NoteCard from "../notes/NoteCard";

const MemoizedNoteCard = React.memo(NoteCard);

export default function LeadNotesTab({ data }) {
  // data here represents the normalized notes array from the view model
  // If this tab later owns its own hook, we would fetch here
  const notes = Array.isArray(data) ? data : [];

  if (notes.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl bg-gray-50">
        No notes available.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {notes.map((note, index) => (
        <MemoizedNoteCard key={note.id || index} note={note} />
      ))}
    </div>
  );
}
