import Select from "@/components/ui/Select";

export default function LeadFilters({ filters, actions, options }) {
  if (!options) return null;

  const createOptions = (arr) => {
    if (!arr) return [{ label: "All", value: "" }];
    return [{ label: "All", value: "" }, ...arr.map((item) => ({ label: item, value: item }))];
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 bg-white p-4 rounded-xl border shadow-sm mb-5">
      <Select
        label="Source"
        name="source"
        value={filters.source}
        onChange={(e) => actions.setSource(e.target.value)}
        options={createOptions(options.sources)}
      />
      <Select
        label="Status"
        name="status"
        value={filters.status}
        onChange={(e) => actions.setStatus(e.target.value)}
        options={createOptions(options.statuses)}
      />
      <Select
        label="Caller"
        name="callerName"
        value={filters.callerName}
        onChange={(e) => actions.setCallerName(e.target.value)}
        options={createOptions(options.callerNames)}
      />
      <Select
        label="Course"
        name="course"
        value={filters.course}
        onChange={(e) => actions.setCourse(e.target.value)}
        options={createOptions(options.courses)}
      />
      <Select
        label="Opinion"
        name="opinion"
        value={filters.opinion}
        onChange={(e) => actions.setOpinion(e.target.value)}
        options={createOptions(options.opinions)}
      />
      <Select
        label="State"
        name="state"
        value={filters.state}
        onChange={(e) => actions.setState(e.target.value)}
        options={createOptions(options.states)}
      />
      <Select
        label="District"
        name="district"
        value={filters.district}
        onChange={(e) => actions.setDistrict(e.target.value)}
        options={createOptions(options.districts)}
      />
      <Select
        label="Taluk"
        name="taluk"
        value={filters.taluk}
        onChange={(e) => actions.setTaluk(e.target.value)}
        options={createOptions(options.taluks)}
      />
    </div>
  );
}
