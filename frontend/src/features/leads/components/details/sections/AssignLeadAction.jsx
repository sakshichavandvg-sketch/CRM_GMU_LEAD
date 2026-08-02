"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";
import AssignLeadsModal from "../../AssignLeadsModal";
import useUsers from "../../../../users/useUsers";
import { useAssignLeads } from "../../../hooks/useAssignLeads";

export default function AssignLeadAction({ leadId, isAssigned, currentTelecallerId, fullWidth }) {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  
  const { data: usersData } = useUsers({ size: 1000 });
  const telecallers = usersData?.users || [];
  const { mutate: assignLeads, isPending: isAssigning } = useAssignLeads(() => {
    setIsAssignModalOpen(false);
  });

  const handleAssign = (selectedTelecallerId) => {
    assignLeads({
      leadIds: [leadId],
      telecallerId: selectedTelecallerId,
    });
  };

  const mode = isAssigned ? "reassign" : "assign";

  return (
    <>
      <Button 
        className={`bg-[#dca450] hover:bg-[#c99547] text-white font-semibold rounded-lg shadow-sm px-6 py-2 border border-transparent ${fullWidth ? 'w-full' : ''}`}
        icon={<UserPlus size={16} />}
        onClick={() => setIsAssignModalOpen(true)}
      >
        {isAssigned ? "Reassign Lead" : "Assign Lead"}
      </Button>

      {isAssignModalOpen && (
        <AssignLeadsModal
          open={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          onAssign={handleAssign}
          telecallers={telecallers}
          selectedCount={1}
          isAssigning={isAssigning}
          mode={mode}
          currentTelecallerId={currentTelecallerId}
        />
      )}
    </>
  );
}
