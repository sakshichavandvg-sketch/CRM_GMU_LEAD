import { CalendarClock, CheckCircle2, Clock, CalendarDays } from "lucide-react";
import React from "react";

const SummaryCard = ({ title, count, icon: Icon, isActive, onClick, colorClass, bgClass }) => (
  <button 
    onClick={onClick}
    className={`flex items-center p-4 rounded-xl border text-left transition-all ${
      isActive 
        ? `border-${colorClass.split('-')[1]}-500 ring-1 ring-${colorClass.split('-')[1]}-500 shadow-sm ${bgClass}` 
        : 'border-[#ECECEC] bg-white hover:border-slate-300 hover:shadow-sm'
    }`}
  >
    <div className={`p-2.5 rounded-lg ${isActive ? 'bg-white' : bgClass} ${colorClass} mr-4`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-sm font-[500] text-slate-500 mb-0.5">{title}</p>
      <p className="text-xl font-[700] text-gray-900">{count}</p>
    </div>
  </button>
);

export default function SummaryCards({ summaryCards, activeTab, onTabChange }) {
  const cards = [
    { id: "today", title: "Today's Work", count: summaryCards.today, icon: Clock, colorClass: "text-[#7A1F2B]", bgClass: "bg-[#7A1F2B]/5" },
    { id: "upcoming", title: "Upcoming", count: summaryCards.upcoming, icon: CalendarDays, colorClass: "text-blue-600", bgClass: "bg-blue-50" },
    { id: "overdue", title: "Overdue", count: summaryCards.overdue, icon: CalendarClock, colorClass: "text-red-600", bgClass: "bg-red-50" },
    { id: "completed", title: "Completed", count: summaryCards.completed, icon: CheckCircle2, colorClass: "text-emerald-600", bgClass: "bg-emerald-50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(card => (
        <SummaryCard 
          key={card.id}
          title={card.title}
          count={card.count}
          icon={card.icon}
          colorClass={card.colorClass}
          bgClass={card.bgClass}
          isActive={activeTab === card.id}
          onClick={() => onTabChange(card.id)}
        />
      ))}
    </div>
  );
}
