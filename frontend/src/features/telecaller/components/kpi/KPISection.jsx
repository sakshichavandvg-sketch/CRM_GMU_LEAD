import { Users, PhoneCall, Heart, CheckCircle2, Target, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

import { KPICard, KPICardSkeleton } from "@/components/dashboard-ui/KPICard";

export default function KPISection({ isLoading, summary }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => <KPICardSkeleton key={i} />)}
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <KPICard 
        title="Assigned" 
        value={summary.assigned} 
        icon={Users} 
        trend="+12% today"
        trendDirection="up"
        variant="blue"
        href="/telecaller/leads?status=ALL"
      />
      <KPICard 
        title="Calls Today" 
        value={summary.callsToday} 
        icon={PhoneCall} 
        trend="+18% today"
        trendDirection="up"
        variant="primary"
        href="/telecaller/calls?date=today"
      />
      <KPICard 
        title="Connected" 
        value={summary.connected} 
        icon={PhoneCall} 
        trend="+5% today"
        trendDirection="up"
        variant="success"
        href="/telecaller/calls?status=CONNECTED"
      />
      <KPICard 
        title="Interested" 
        value={summary.interested} 
        icon={Heart} 
        trend="+5% today"
        trendDirection="up"
        variant="purple"
        href="/telecaller/leads?status=INTERESTED"
      />
      <KPICard 
        title="Admissions" 
        value={summary.admissions} 
        icon={CheckCircle2} 
        trend="+2 today"
        trendDirection="up"
        variant="warning"
        href="/telecaller/leads?status=ADMISSION"
      />
      <KPICard 
        title="Goal %" 
        value={`${summary.goal}%`} 
        icon={Target} 
        trend="On Track"
        trendDirection="neutral"
        variant="cyan"
      />
    </div>
  );
}
