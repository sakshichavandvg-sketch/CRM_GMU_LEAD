import TemperatureCard from "./TemperatureCard";
import { Flame, Snowflake } from "lucide-react";

export default function LeadTemperature() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <TemperatureCard
        value={46}
        title="Hot Leads"
        subtitle="Score ≥ 75"
        trend={12}
        trendLabel="Today"
        icon={Flame}
        variant="orange"
      />
      <TemperatureCard
        value={66}
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