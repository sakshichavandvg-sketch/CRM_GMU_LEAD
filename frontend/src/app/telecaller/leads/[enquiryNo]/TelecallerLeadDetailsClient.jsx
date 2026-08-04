"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PhoneCall, AlertTriangle, CalendarPlus } from "lucide-react";
import { useLeadDetails } from "@/features/telecaller/hooks/useLeadDetails";
import LeadDetailsView from "@/features/leads/components/details/LeadDetailsView";
import LogCallModal from "@/features/telecaller/components/LogCallModal";
import Button from "@/components/ui/Button";
import { TELECALLER_TABS_CONFIG } from "@/features/telecaller/constants/telecallerDetailsConfig";
import CallButton from "@/features/telecaller/voice/components/CallButton";
import CallStatusBadge from "@/features/telecaller/voice/components/CallStatusBadge";
import { useVoice } from "@/features/telecaller/voice/context/VoiceProvider";

export default function TelecallerLeadDetailsClient({ enquiryNo }) {
  const router = useRouter();
  const [isLogCallOpen, setIsLogCallOpen] = useState(false);
  const { postCallEnquiryNo, setPostCallEnquiryNo } = useVoice();

  // If a call just ended for this enquiry, open the log call modal automatically
  useEffect(() => {
    if (postCallEnquiryNo === enquiryNo && !isLogCallOpen) {
      setIsLogCallOpen(true);
      setPostCallEnquiryNo(null);
    }
  }, [postCallEnquiryNo, enquiryNo, isLogCallOpen, setPostCallEnquiryNo]);

  const handleBack = () => router.push("/telecaller/leads");

  const { data: viewModel, isLoading, isError, error } = useLeadDetails(enquiryNo);

  // ── Error states ────────────────────────────────────────────────────────────
  if (isError && error?.response?.status === 403) {
    return (
      <div className="flex flex-col mt-4 max-w-6xl mx-auto items-center justify-center h-96">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-6 max-w-md text-center">
          You don&apos;t have access to this lead. It may be assigned to another telecaller.
        </p>
        <Button onClick={handleBack} variant="outline">Return to My Leads</Button>
      </div>
    );
  }

  if (isError && error?.response?.status === 404) {
    return (
      <div className="flex flex-col mt-4 max-w-6xl mx-auto items-center justify-center h-96">
        <div className="w-16 h-16 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Lead Not Found</h2>
        <p className="text-gray-500 mb-6 max-w-md text-center">
          This lead does not exist or has been deleted.
        </p>
        <Button onClick={handleBack} variant="outline">Return to My Leads</Button>
      </div>
    );
  }

  // ── Telecaller-specific action buttons ──────────────────────────────────────
  const actions = (
    <>
      <CallStatusBadge />
      <CallButton
        enquiryNo={enquiryNo}
        phone={viewModel?.contact?.mobile}
        name={viewModel?.header?.name}
      />

      <Button
        variant="outline"
        className="justify-center w-fit whitespace-nowrap bg-white border-slate-300 text-gray-800 hover:bg-slate-50 font-semibold rounded-lg shadow-sm px-4 py-2 text-sm"
        icon={<PhoneCall size={14} />}
        onClick={() => setIsLogCallOpen(true)}
      >
        Log Call
      </Button>

      <Button
        variant="outline"
        className="justify-center w-fit whitespace-nowrap bg-white border-slate-300 text-gray-800 hover:bg-slate-50 font-semibold rounded-lg shadow-sm px-4 py-2 text-sm"
        icon={<CalendarPlus size={14} />}
      >
        Add Follow-up
      </Button>
    </>
  );

  return (
    <div className="flex flex-col mt-4 max-w-6xl mx-auto">
      <LeadDetailsView
        leadId={enquiryNo}
        viewModel={viewModel}
        rawData={viewModel?.rawData}
        isLoading={isLoading}
        isError={isError}
        error={error}
        actions={actions}
        tabsConfig={TELECALLER_TABS_CONFIG}
        showStats={true}
      />

      {/* Log Call Modal */}
      {isLogCallOpen && (
        <LogCallModal
          open={isLogCallOpen}
          onClose={() => setIsLogCallOpen(false)}
          enquiryNo={enquiryNo}
        />
      )}
    </div>
  );
}
