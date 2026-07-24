import React from 'react';
import NoteCard from "../notes/NoteCard";
import { useLeadNotes } from "../../../hooks/useLeadNotes";
import { FormSkeleton } from "@/components/ui/Skeletons";

const MemoizedNoteCard = React.memo(NoteCard);

export default function LeadNotesTab({ leadId }) {
  const { data, isLoading, isError, error } = useLeadNotes(leadId);

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
        {error?.response?.data?.message || "Failed to load notes."}
      </div>
    );
  }

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
