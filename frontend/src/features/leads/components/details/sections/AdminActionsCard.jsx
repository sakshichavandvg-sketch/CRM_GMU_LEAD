export default function AdminActionsCard({ data }) {
  if (!data?.admin) return null;
  const { remarks, createdBy } = data.admin;

  return (
    <div className="bg-red-50/30 border border-red-100 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-red-100 bg-red-50/80">
        <h3 className="text-sm font-semibold text-red-900 tracking-tight">Admin Actions</h3>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-red-700/70 font-medium">Created By</span>
          <span className="text-sm font-medium text-red-900">{createdBy}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-red-700/70 font-medium">System Remarks</span>
          <span className="text-sm text-red-800 bg-white p-3 rounded-md border border-red-100 whitespace-pre-wrap">{remarks}</span>
        </div>
      </div>
    </div>
  );
}
