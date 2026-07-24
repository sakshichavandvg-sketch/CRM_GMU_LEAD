import LeadDetailsClient from "./LeadDetailsClient";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { breadcrumbs } from "@/config/breadcrumbs";

export default async function LeadDetailsPage({ params }) {
  const { leadId } = await params;

  return (
    <div className="flex flex-col min-h-0 h-full overflow-y-auto">
      <div className="mb-6">
        <DashboardHeader breadcrumbs={breadcrumbs.leadsDetail} />
      </div>
      
      <div className="flex-1 pb-10">
        <LeadDetailsClient leadId={leadId} />
      </div>
    </div>
  );
}
