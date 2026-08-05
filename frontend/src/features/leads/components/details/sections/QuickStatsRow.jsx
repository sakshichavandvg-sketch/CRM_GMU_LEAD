"use client";

import { Tag, ArrowUpRight, User, Clock, Phone, ArrowRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { KPICard } from "@/components/dashboard-ui/KPICard";

export default function QuickStatsRow({ data }) {
  if (!data) return null;

  const { status, assignment } = data;

  const stats = [
    {
      label: "Current Status",
      value: status?.currentStatus || "ENQUIRY",
      icon: Tag,
      variant: "success",
    },
    {
      label: "Pipeline Stage",
      value: status?.stage || "NEW",
      icon: ArrowUpRight,
      variant: "blue",
    },
    {
      label: "Assigned To",
      value: assignment?.assignee || assignment?.telecaller || "Unassigned",
      icon: User,
      variant: "purple",
    },
    {
      label: "Last Contact",
      value: "Just now", 
      icon: Clock,
      variant: "orange",
    },
    {
      label: "Total Calls",
      value: "12", 
      icon: Phone,
      variant: "primary", // maps to red-50
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {/* Follow Up Card - Dark Maroon */}
      <motion.div 
        whileHover={{ y: -2 }}
        className="col-span-2 md:col-span-1 xl:col-span-1 bg-[#8B1C31] p-5 rounded-[20px] shadow-sm flex flex-col justify-between text-white relative overflow-hidden group cursor-pointer"
        style={{ minHeight: "156px" }}
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
        <KPICard
          key={idx}
          title={stat.label}
          value={stat.value}
          icon={stat.icon}
          variant={stat.variant}
        />
      ))}
    </div>
  );
}
