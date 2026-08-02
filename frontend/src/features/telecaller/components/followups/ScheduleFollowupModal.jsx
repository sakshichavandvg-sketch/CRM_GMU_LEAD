import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { useCreateFollowup } from "@/features/telecaller/hooks/useFollowupMutations";
import { Clock } from "lucide-react";

const MOCK_LEADS = [
  { label: "Rahul Sharma (BCA) - +91 9876543210", value: "GMU1001" },
  { label: "Priya Singh (B.Tech) - +91 9988776655", value: "GMU1002" },
  { label: "Amit Kumar (BBA) - +91 9123456789", value: "GMU1003" },
  { label: "Sneha Gupta (MBA) - +91 9876123450", value: "GMU1004" }
];

export default function ScheduleFollowupModal({ isOpen, onClose, defaultDate, existingFollowups = [] }) {
  console.log("[ScheduleFollowupModal] render", { isOpen, defaultDate, existingFollowupsCount: existingFollowups.length });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [leadId, setLeadId] = useState(""); 

  const createMutation = useCreateFollowup();

  useEffect(() => {
    if (isOpen) {
      setDate(defaultDate || "");
      setTime("");
      setNotes("");
      setPriority("Medium");
      setLeadId("");
    }
  }, [isOpen, defaultDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[ScheduleFollowupModal] handleSubmit", {
      leadId,
      selectedDate: date,
      selectedTime: time,
      priority,
      notes,
      canSubmit: !!leadId && !!date && !!time,
      isOpen,
    });

    createMutation.mutate(
      { 
        leadId,
        scheduledDate: date, 
        scheduledTime: time, 
        priority,
        remarks: notes 
      },
      {
        onSuccess: () => {
          console.log("[ScheduleFollowupModal] createMutation success");
          onClose();
        },
        onError: (error) => {
          console.error("[ScheduleFollowupModal] createMutation error", error);
        }
      }
    );
  };

  const formattedDate = defaultDate 
    ? new Date(defaultDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    : "Select Date";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Schedule for ${formattedDate}`}>
      <div className="flex flex-col max-h-[80vh]">
        
        {/* Existing Follow-ups Section */}
        {existingFollowups.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Existing Follow-ups ({existingFollowups.length})</h4>
            <div className="max-h-[160px] overflow-y-auto custom-scrollbar flex flex-col gap-2 pr-2">
              {existingFollowups.map(f => (
                <div key={f.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">
                      {f.student || f.leadName || "Unknown Lead"}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> {f.scheduledTime || f.time || "TBA"}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                    f.priority === 'High' ? 'text-red-700 bg-red-50 border-red-200' :
                    f.priority === 'Medium' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                    'text-blue-700 bg-blue-50 border-blue-200'
                  }`}>
                    {f.priority || "Normal"}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-px w-full bg-slate-200 mt-6"></div>
          </div>
        )}

        {/* Schedule Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto custom-scrollbar pr-1 pb-1">
          
          <h4 className="text-sm font-semibold text-gray-700">Schedule New Follow-up</h4>

          <SearchableSelect
            label="Select Lead"
            placeholder="Search leads by name or phone..."
            options={MOCK_LEADS}
            value={leadId}
            onChange={setLeadId}
            required
          />

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

          <Select 
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={[
              { label: "High", value: "High" },
              { label: "Medium", value: "Medium" },
              { label: "Low", value: "Low" }
            ]}
          />

          <Textarea 
            label="Notes (Optional)"
            rows={2}
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
              className="h-10 text-sm font-semibold bg-[#7A1F2B] hover:bg-[#6F1D28] text-white shadow-sm transition-colors border-none"
              disabled={createMutation.isPending || !leadId}
            >
              {createMutation.isPending ? "Scheduling..." : "Confirm Schedule"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
