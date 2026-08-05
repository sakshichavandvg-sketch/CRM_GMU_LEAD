import { KPICard } from "../dashboard-ui/KPICard";
import { Flame, Snowflake } from "lucide-react";

export default function LeadTemperature({ temperature }) {
  const hot = temperature?.hot || 0;
  const cold = temperature?.cold || 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <KPICard
        value={hot}
        title="Hot Leads"
        subtitle="Score ≥ 75"
        trend="+12 Today"
        trendDirection="up"
        icon={Flame}
        variant="danger"
      />
      <KPICard
        value={cold}
        title="Cold Leads"
        subtitle="Score < 75"
        trend="-5 Today"
        trendDirection="down"
        icon={Snowflake}
        variant="cyan"
      />
    </div>
  );
}