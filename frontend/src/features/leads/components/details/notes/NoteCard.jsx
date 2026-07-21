export default function NoteCard({ note }) {
  if (!note) return null;
  const { author, createdAt, content } = note;

  const formattedTime = createdAt ? new Date(createdAt).toLocaleString() : "Unknown time";

  return (
    <div className="bg-yellow-50/50 border border-yellow-100 p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-gray-900">{author || "Unknown User"}</span>
        <span className="text-xs text-gray-500 font-medium">{formattedTime}</span>
      </div>
      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{content}</p>
    </div>
  );
}
