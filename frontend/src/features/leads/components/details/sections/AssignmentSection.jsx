import { Mail, Phone } from "lucide-react";

export default function AssignmentSection({ data }) {
  if (!data?.assignment) return null;
  const { telecaller, assignee, phone, email, assignedDate, assignedBy, status } = data.assignment;

  const displayName = assignee || telecaller || "Unassigned";

  return (
    <dl className="flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <dt className="text-xs text-slate-500 font-medium mt-1">Assigned To</dt>
        <dd className="flex flex-col items-end gap-1 text-right">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-bold text-slate-900">{displayName}</span>
          </div>
          {(phone || email) && displayName !== "Unassigned" && (
            <div className="flex flex-col items-end gap-1 text-[11px] text-gray-500 font-medium mt-1">
              {phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {phone}</span>}
              {email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {email}</span>}
            </div>
          )}
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium mb-1">Assigned Date</dt>
        <dd className="text-sm font-semibold text-slate-900">{assignedDate}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium mb-1">Assigned By</dt>
        <dd className="text-sm font-semibold text-slate-900">{assignedBy}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium mb-1">Assignment Status</dt>
        <dd className="text-sm font-semibold">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
            {status}
          </span>
        </dd>
      </div>
    </dl>
  );
}
