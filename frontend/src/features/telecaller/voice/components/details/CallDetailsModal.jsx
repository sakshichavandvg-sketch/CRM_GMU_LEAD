import React from "react";
import Modal from "@/components/ui/Modal";
import CallDetailsView from "./CallDetailsView";

export default function CallDetailsModal({ callId, defaultTab = "summary", open, onClose, showRecording = false }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Call Details"
      size="xl"
    >
      {open && callId && (
        <CallDetailsView 
          callId={callId} 
          defaultTab={defaultTab} 
          onClose={onClose}
          showRecording={showRecording}
        />
      )}
    </Modal>
  );
}
