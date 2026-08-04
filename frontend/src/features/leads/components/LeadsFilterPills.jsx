"use client";

import React from "react";

export default function LeadsFilterPills({ activeFilter = "", onSelect, counts = {} }) {
  const pills = [
    { id: "",                label: "All Leads",       icon: null,                     iconColor: "" },
    { id: "hot",            label: "Hot Leads",        icon: "local_fire_department",  iconColor: "text-orange-500" },
    { id: "cold",           label: "Cold Leads",       icon: "ac_unit",                iconColor: "text-blue-400" },
    { id: "alloted",        label: "Alloted",          icon: null,                     iconColor: "" },
    { id: "not-alloted",    label: "Not Alloted",      icon: null,                     iconColor: "" },
    { id: "not-consulted",  label: "Not Consulted",    icon: "schedule",               iconColor: "text-red-500" },
    { id: "opinion-reassign", label: "Opinion Reassign", icon: "sync",                 iconColor: "text-purple-500" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {pills.map(({ id, label, icon, iconColor }) => {
        const isActive = activeFilter === id;
        const count = counts[id === "" ? "all" : id];

        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer ${
              isActive
                ? "bg-[#8B0D16]/5 border-[#8B0D16] text-[#8B0D16] shadow-sm"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm"
            }`}
          >
            {icon && (
              <span className={`material-symbols-outlined text-[16px] ${iconColor}`}>{icon}</span>
            )}
            <span>{label}</span>
            {count !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                  isActive
                    ? "bg-[#8B0D16] text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
