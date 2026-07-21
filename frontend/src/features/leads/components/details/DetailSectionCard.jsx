export default function DetailSectionCard({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-semibold text-gray-800 tracking-tight">{title}</h3>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-4 text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
}
