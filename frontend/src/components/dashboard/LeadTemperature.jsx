import { MetricCard } from "../dashboard-ui/MetricCard";
import { Flame, Snowflake } from "lucide-react";

export default function LeadTemperature({ temperature }) {
  const hot = temperature?.hot || 0;
  const cold = temperature?.cold || 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <MetricCard
        value={hot}
        title="Hot Leads"
        subtitle="Score ≥ 75"
        trend={12}
        trendLabel="Today"
        icon={Flame}
        variant="orange"
      />
      <MetricCard
        value={cold}
        title="Cold Leads"
        subtitle="Score < 75"
        trend={-5}
        trendLabel="Today"
        icon={Snowflake}
        variant="blue"
      />
    </div>
  );
}