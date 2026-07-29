import DetailSectionCard from "../DetailSectionCard";

export default function AdminActionsCard({ data }) {
  if (!data?.admin) return null;
  const { createdBy, createdOn, lastUpdated, remarks } = data.admin;

  return (
    <dl className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Created By</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 text-right">{createdBy || "System"}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Created On</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 text-right">{createdOn || "18 July 2025, 09:15 AM"}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Last Updated</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 text-right">{lastUpdated || "20 July 2025, 11:45 AM"}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">System Remarks</dt>
        <dd className="text-sm font-medium text-slate-500 italic flex-1 text-right">{remarks || "No remarks available."}</dd>
      </div>
    </dl>
  );
}
