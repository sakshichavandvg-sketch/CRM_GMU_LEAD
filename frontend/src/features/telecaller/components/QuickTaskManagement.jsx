import { ChevronRight, Users, PhoneCall, LayoutList } from "lucide-react";
import Button from "@/components/ui/Button";

export default function QuickTaskManagement() {
  const tasks = [
    {
      id: 1,
      icon: Users,
      title: "Assigned Leads",
      subtitle: "Calls made up",
    },
    {
      id: 2,
      icon: PhoneCall,
      title: "Add Follow-up",
      subtitle: "Add follow-up",
    },
    {
      id: 3,
      icon: LayoutList,
      title: "View My Leads",
      subtitle: "Calls made today",
    }
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Quick Task Management</h3>
          <p className="text-xs font-medium text-gray-500 mt-0.5">Your follow-ups for today</p>
        </div>
        <button className="text-[11px] font-bold text-gray-800 hover:text-gray-600 transition-colors flex items-center mt-1">
          View full schedule <ChevronRight size={14} className="ml-0.5" strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-3">
        {tasks.map((task) => {
          const Icon = task.icon;
          return (
            <div key={task.id} className="flex items-center justify-between p-3 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-[#6F1D28] flex items-center justify-center shrink-0">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{task.title}</p>
                  <p className="text-xs font-medium text-gray-500 mt-0.5">{task.subtitle}</p>
                </div>
              </div>
              
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-900 rounded-lg text-xs font-bold shadow-sm hover:bg-gray-50 transition-colors tracking-wide">
                Quick Call
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
