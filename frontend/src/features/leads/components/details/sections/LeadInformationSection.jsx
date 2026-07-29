export default function LeadInformationSection({ data }) {
  if (!data?.lead) return null;
  const { source, opinion, programme, course, discipline, college } = data.lead;

  return (
    <dl className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Source</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 text-right">{source || "—"}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Opinion</dt>
        <dd className="text-sm font-semibold flex-1 flex justify-end">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-orange-50 text-orange-600 border border-orange-200">
            {opinion || "WARM"}
          </span>
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Programme</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 text-right">{programme || "—"}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Course</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 text-right">{course || "—"}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Discipline</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 text-right">{discipline || "—"}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">College</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 text-right">{college || "—"}</dd>
      </div>
    </dl>
  );
}
