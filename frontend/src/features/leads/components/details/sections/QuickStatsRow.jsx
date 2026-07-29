"use client";

import { Tag, ArrowUpRight, User, Clock, Phone, ArrowRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickStatsRow({ data }) {
  if (!data) return null;

  const { status, assignment } = data;

  const stats = [
    {
      label: "Current Status",
      value: status?.currentStatus || "ENQUIRY",
      icon: <Tag className="w-5 h-5 text-emerald-500" />,
      bgColor: "bg-emerald-50/50",
    },
    {
      label: "Pipeline Stage",
      value: status?.stage || "NEW",
      icon: <ArrowUpRight className="w-5 h-5 text-blue-500" />,
      bgColor: "bg-blue-50/50",
    },
    {
      label: "Assigned To",
      value: assignment?.assignee || assignment?.telecaller || "Unassigned",
      icon: <User className="w-5 h-5 text-purple-500" />,
      bgColor: "bg-purple-50/50",
    },
    {
      label: "Last Contact",
      value: "Just now", 
      icon: <Clock className="w-5 h-5 text-orange-500" />,
      bgColor: "bg-orange-50/50",
    },
    {
      label: "Total Calls",
      value: "12", 
      icon: <Phone className="w-5 h-5 text-indigo-500" />,
      bgColor: "bg-indigo-50/50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {/* Follow Up Card - Dark Maroon */}
      <motion.div 
        whileHover={{ y: -2 }}
        className="col-span-2 md:col-span-1 xl:col-span-1 bg-[#8B1C31] p-5 rounded-[20px] shadow-sm flex flex-col justify-between text-white relative overflow-hidden group cursor-pointer"
      >
        <div className="flex items-center gap-2 mb-4 opacity-90">
          <CalendarDays className="w-4 h-4" />
          <span className="text-[10px] font-bold tracking-widest uppercase">Next Follow-up</span>
        </div>
        <div className="mb-2">
          <div className="text-[22px] font-bold leading-tight">Tomorrow</div>
          <div className="text-sm opacity-80 mt-1">10:00 AM</div>
        </div>
        <div className="absolute right-4 bottom-5 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Grid for other stats */}
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          whileHover={{ y: -2 }}
          className="bg-white p-5 rounded-[20px] border border-gray-100 shadow-sm flex flex-col justify-between"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${stat.bgColor}`}>
            {stat.icon}
          </div>
          <div>
            <div className="text-[11px] text-gray-500 font-medium mb-1.5">{stat.label}</div>
            <div className="text-sm font-bold text-gray-900 truncate uppercase tracking-wide" title={stat.value}>{stat.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
