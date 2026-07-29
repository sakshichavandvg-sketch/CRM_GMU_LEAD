import React, { useState } from 'react';
import NoteCard from "@/features/leads/components/details/notes/NoteCard";
import { useTelecallerLeadNotes } from "../../../hooks/useTelecallerLeadNotes";
import { FormSkeleton } from "@/components/ui/Skeletons";

const MemoizedNoteCard = React.memo(NoteCard);

export default function TelecallerNotesTab({ leadId }) {
  const { data, isLoading, isError, error } = useTelecallerLeadNotes(leadId);
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) {
    return (
      <div className="p-5">
        <FormSkeleton />
      </div>
    );
  }

  if (isError && error?.response?.status !== 404) {
    return (
      <div className="p-8 text-center text-sm text-red-500 border border-red-100 rounded-xl bg-red-50">
        {error?.response?.data?.message || "Failed to load notes for this lead."}
      </div>
    );
  }

  const notes = Array.isArray(data) ? data : [];
  
  const filteredNotes = notes.filter(note => 
    note.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.createdBy?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-900">Lead Notes ({notes.length})</h3>
        <input 
          type="text" 
          placeholder="Search notes..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#7A1F2B]/20 focus:border-[#7A1F2B]"
        />
      </div>

      {notes.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl bg-gray-50">
          No notes recorded yet.
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="p-8 text-center text-sm text-gray-500 border border-dashed border-gray-200 rounded-xl bg-gray-50">
          No notes match your search.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map(note => (
            <MemoizedNoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  );
}
