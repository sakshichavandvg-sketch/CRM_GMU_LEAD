export default function LeadInformationSection({ data }) {
  if (!data?.lead) return null;
  const { source, opinion, programme, discipline, college } = data.lead;

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Source</span>
          <span className="font-medium text-gray-900">{source}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Opinion</span>
          <span className="font-medium text-gray-900">{opinion}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">Programme</span>
        <span className="font-medium text-gray-900">{programme}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">Discipline</span>
        <span className="font-medium text-gray-900">{discipline}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">College</span>
        <span className="font-medium text-gray-900">{college}</span>
      </div>
    </>
  );
}
