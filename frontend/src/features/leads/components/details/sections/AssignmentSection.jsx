export default function AssignmentSection({ data }) {
  if (!data?.assignment) return null;
  const { telecaller, assignee } = data.assignment;

  return (
    <>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">Telecaller</span>
        <span className="font-medium text-gray-900">{telecaller}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">Assignee</span>
        <span className="font-medium text-gray-900">{assignee}</span>
      </div>
    </>
  );
}
