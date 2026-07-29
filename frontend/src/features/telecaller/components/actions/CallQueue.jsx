import { Phone, Clock, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { useQueryClient } from "@tanstack/react-query";
import { telecallerLeadService } from "../services/telecallerLeadService";

const CallItem = ({ name, status, time, lastCall, onCall, isNext, onHover }) => (
  <div 
    className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 group hover:bg-slate-50 transition-colors rounded-xl px-2 -mx-2"
    onMouseEnter={onHover}
  >
    <div>
      <p className="text-[16px] font-bold text-gray-900">{name}</p>
      <div className="flex items-center gap-3 mt-1">
        <span className="text-[12px] font-medium text-slate-500">{status}</span>
        {lastCall && (
          <span className="text-[12px] font-medium text-slate-400 flex items-center gap-1">
            <Clock size={12} /> {lastCall}
          </span>
        )}
        <span className="text-[12px] font-medium text-blue-600 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full">
          <Calendar size={12} /> {time}
        </span>
      </div>
    </div>
    
    <Button 
      onClick={onCall}
      className={`h-10 px-6 rounded-xl font-bold tracking-wide transition-all ${
        isNext 
          ? "bg-[#7A1F2B] hover:bg-[#6F1D28] text-white shadow-md hover:shadow-lg" 
          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
      }`}
    >
      <Phone size={16} className="mr-2" />
      {isNext ? "CALL NOW" : "CALL"}
    </Button>
  </div>
);

export default function CallQueue({ schedule = [], onLogCall }) {
  const queryClient = useQueryClient();

  const handlePrefetch = (enquiryNo) => {
    queryClient.prefetchQuery({
      queryKey: ["telecaller", "lead", enquiryNo],
      queryFn: () => telecallerLeadService.getLeadDetails(enquiryNo),
      staleTime: 60000,
    });
    queryClient.prefetchQuery({
      queryKey: ["telecaller", "timeline", enquiryNo],
      queryFn: () => telecallerLeadService.getLeadTimeline(enquiryNo),
      staleTime: 60000,
    });
  };

  const displayQueue = schedule.length > 0 ? schedule : [
    { enquiryNo: 1, name: "Rahul Sharma", status: "Interested", time: "Today 10:30", lastCall: "2 days ago" },
    { enquiryNo: 2, name: "Sneha", status: "Documents Pending", time: "Today 11:45", lastCall: "Yesterday" },
    { enquiryNo: 3, name: "Amit Kumar", status: "New Lead", time: "Tomorrow", lastCall: "Never" },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[20px] font-semibold text-gray-900">Next Calls</h2>
        <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
          {displayQueue.length} Pending
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {displayQueue.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
            <Phone size={32} className="text-slate-300 mb-3" />
            <p className="font-medium text-gray-900">No calls pending</p>
            <p className="text-sm mt-1">Start calling your assigned leads</p>
          </div>
        ) : (
          displayQueue.map((call, index) => (
            <CallItem 
              key={call.enquiryNo}
              name={call.name}
              status={call.status}
              time={call.time}
              lastCall={call.lastCall}
              isNext={index === 0}
              onCall={() => onLogCall(call.enquiryNo)}
              onHover={() => handlePrefetch(call.enquiryNo)}
            />
          ))
        )}
      </div>
    </div>
  );
}
