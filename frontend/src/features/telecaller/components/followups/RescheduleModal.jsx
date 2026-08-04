import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { useUpdateFollowup } from "@/features/telecaller/hooks/useFollowupMutations";

const normalizeTimeValue = (value) => {
  if (!value) return "";
  const timeValue = String(value).trim();
  if (timeValue.length <= 5) return timeValue;
  return timeValue.slice(0, 5);
};

export default function RescheduleModal({ isOpen, onClose, followup }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  
  const updateMutation = useUpdateFollowup();

  useEffect(() => {
    if (followup) {
      setDate(followup.scheduledDate || followup.date || "");
      setTime(normalizeTimeValue(followup.scheduledTime || followup.time));
      setNotes(followup.remarks || "");
    }
  }, [followup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!followup) return;

    const payload = {
      scheduledDate: date,
      scheduledTime: time.length === 5 ? `${time}:00` : time,
      remarks: notes,
    };

    console.log("[RescheduleModal] ========== PAYLOAD BEFORE MUTATE ==========");
    console.log("[RescheduleModal] Followup ID:", followup.id);
    console.log("[RescheduleModal] Form state - date:", date);
    console.log("[RescheduleModal] Form state - time:", time);
    console.log("[RescheduleModal] Form state - notes:", notes);
    console.log("[RescheduleModal] Constructed payload:", JSON.stringify(payload, null, 2));

    updateMutation.mutate(
      { 
        id: followup.id, 
        data: payload
      },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reschedule Follow-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input 
            label="Time"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <Textarea 
          label="Notes (Optional)"
          rows={3}
          placeholder="Add any remarks for this follow-up..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex justify-end gap-3 pt-5 mt-2 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={onClose} className="h-10 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border-slate-200">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="primary" 
            className="h-10 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white shadow-sm transition-colors border-none"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Confirm Reschedule"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
