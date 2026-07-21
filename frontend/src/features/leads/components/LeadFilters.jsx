import Select from "@/components/ui/Select";
import { FILTER_CONFIG } from "../constants/filterConfig";

export default function LeadFilters({ values, options, onChange }) {
  if (!options) return null;

  const createOptions = (arr) => {
    if (!arr) return [{ label: "All", value: "" }];
    return [{ label: "All", value: "" }, ...arr.map((item) => ({ label: item, value: item }))];
  };

  return (
    <div className="flex flex-col gap-6">
      {FILTER_CONFIG.map((config) => (
        <Select
          key={config.key}
          label={config.label}
          name={config.key}
          value={values[config.key] || ""}
          onChange={(e) => onChange(config.key, e.target.value)}
          options={createOptions(options[config.optionsKey])}
        />
      ))}
    </div>
  );
}
