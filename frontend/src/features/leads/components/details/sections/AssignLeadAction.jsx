"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";
import AssignLeadsModal from "../../AssignLeadsModal";
import { useTelecallers } from "../../../hooks/useTelecallers";
import { useAssignLeads } from "../../../hooks/useAssignLeads";

export default function AssignLeadAction({ leadId, fullWidth }) {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  
  const { data: telecallers = [] } = useTelecallers();
  const { mutate: assignLeads, isPending: isAssigning } = useAssignLeads(() => {
    setIsAssignModalOpen(false);
  });

  const handleAssign = (selectedTelecallerId) => {
    assignLeads({
      leadIds: [leadId],
      telecallerId: selectedTelecallerId,
    });
  };

  return (
    <>
      <Button 
        className={`bg-[#dca450] hover:bg-[#c99547] text-white font-semibold rounded-lg shadow-sm px-6 py-2 border border-transparent ${fullWidth ? 'w-full' : ''}`}
        icon={<UserPlus size={16} />}
        onClick={() => setIsAssignModalOpen(true)}
      >
        Assign Lead
      </Button>

      {isAssignModalOpen && (
        <AssignLeadsModal
          open={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={handleAssign}
          telecallers={telecallers}
          selectedCount={1}
          isAssigning={isAssigning}
        />
      )}
    </>
  );
}
