import TemperatureCard from "./TemperatureCard";
import { Flame, Snowflake } from "lucide-react";

export default function LeadTemperature({ temperature }) {
  const hot = temperature?.hot || 0;
  const cold = temperature?.cold || 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <TemperatureCard
        value={hot}
        title="Hot Leads"
        subtitle="Score ≥ 75"
        trend={12}
        trendLabel="Today"
        icon={Flame}
        variant="orange"
      />
      <TemperatureCard
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