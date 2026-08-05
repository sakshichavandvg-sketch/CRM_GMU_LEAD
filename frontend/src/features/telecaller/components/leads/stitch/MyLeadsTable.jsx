import React from "react";
import DataTable from "@/components/table/DataTable";
import Badge from "@/components/ui/Badge";
import ActionMenu from "@/components/table/ActionMenu";
import { Phone, PhoneForwarded, PhoneOff, Link as LinkIcon, Users, Search, Globe, Share2, MessageCircle, HelpCircle } from "lucide-react";

const getAvatarColor = (str) => {
  const colors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-500",
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getSourceIcon = (source) => {
  const s = (source || "").toLowerCase();
  if (s.includes("instagram")) return { icon: <Share2 size={14} />, color: "text-pink-600", bg: "bg-pink-50" };
  if (s.includes("facebook")) return { icon: <Users size={14} />, color: "text-blue-600", bg: "bg-blue-50" };
  if (s.includes("google") || s.includes("seo") || s.includes("web")) return { icon: <Globe size={14} />, color: "text-emerald-600", bg: "bg-emerald-50" };
  if (s.includes("whatsapp")) return { icon: <MessageCircle size={14} />, color: "text-green-600", bg: "bg-green-50" };
  if (s.includes("justdial") || s.includes("sulekha")) return { icon: <Search size={14} />, color: "text-orange-600", bg: "bg-orange-50" };
  if (s.includes("referral") || s.includes("friend")) return { icon: <LinkIcon size={14} />, color: "text-purple-600", bg: "bg-purple-50" };
  
  return { icon: <HelpCircle size={14} />, color: "text-gray-500", bg: "bg-gray-50" };
};

const toTitleCase = (str) => {
  if (!str) return "-";
  return str
    .toLowerCase()
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

const getStatusVariant = (status) => {
  const s = (status || "").toUpperCase();
  if (s.includes("NEW") || s.includes("ENQUIRY")) return "blue";
  if (s.includes("NOT INTERESTED") || s.includes("COLD")) return "neutral";
  if (s.includes("INTERESTED") || s.includes("WARM")) return "success";
  if (s.includes("ADMISSION") || s.includes("ENROLLED")) return "purple";
  if (s.includes("FOLLOW") || s.includes("PROGRESS")) return "orange";
  return "neutral";
};

const getOpinionVariant = (opinion) => {
  const s = (opinion || "").toUpperCase();
  if (s.includes("NOT INTERESTED")) return "neutral";
  if (s.includes("INTERESTED")) return "success";
  if (s.includes("PENDING") || s.includes("TIME")) return "yellow";
  if (s.includes("CALLBACK") || s.includes("WARM") || s.includes("HOT")) return "orange";
  return "neutral";
};

const getColumns = (onRowClick) => [
  {
    key: "enquiryNo",
    label: "Enquiry No",
    width: "90px",
    render: (value, row) => (
      <span className="text-sm font-bold text-[#8B0D16]">#{row.enquiryNo || row.id}</span>
    ),
  },
  {
    key: "name",
    label: "Lead",
    width: "260px",
    render: (value, row) => {
      const nameTitleCase = toTitleCase(row.name);
      return (
        <div className="flex items-center gap-3 min-w-[140px]">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(nameTitleCase)}`}>
            {getInitials(nameTitleCase)}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 m-0">{nameTitleCase}</p>
            <p className="text-xs text-gray-400 m-0">{row.email || (row.name ? row.name.toLowerCase().replace(/\s/g, '.') + '@gmail.com' : '')}</p>
          </div>
        </div>
      );
    },
  },
  {
    key: "mobileNo",
    label: "Mobile No",
    width: "170px",
    render: (value, row) => (
      <div className="flex items-center gap-1.5 text-gray-600">
        <Phone size={14} className="text-[#8B0D16]" />
        <span className="text-sm">{value || row.mobileNo || "-"}</span>
      </div>
    ),
  },
  {
    key: "course",
    label: "Course",
    width: "100px",
    render: (value, row) => {
      const courseText = value ? (['MCA', 'BCA', 'MBA', 'BTECH', 'MTECH', 'BBA'].includes(value.toUpperCase()) ? value.toUpperCase() : toTitleCase(value)) : "-";
      return <span className="text-sm text-gray-700">{courseText}</span>;
    },
  },
  {
    key: "status",
    label: "Status",
    width: "140px",
    render: (value) => (
      <Badge variant={getStatusVariant(value)} dot>
        {value || "NEW"}
      </Badge>
    ),
  },
  {
    key: "opinion",
    label: "Opinion",
    width: "140px",
    render: (value) => (
      <Badge variant={getOpinionVariant(value)} dot>
        {value || "-"}
      </Badge>
    ),
  },
  {
    key: "callCount",
    label: "Calls",
    width: "90px",
    render: (value, row) => {
      const count = value || row.callCount || 0;
      return (
        <div className={`flex items-center gap-2 ${count > 0 ? "text-gray-900" : "text-gray-400"}`}>
          {count > 0 ? <PhoneForwarded size={14} /> : <PhoneOff size={14} />}
          <span className="font-bold text-sm">{count}</span>
        </div>
      );
    },
  },
  {
    key: "district",
    label: "District",
    width: "140px",
    render: (value, row) => {
      const districtMain = row.city || row.district || "Unknown";
      const districtSub = row.state || "";
      return (
        <div>
          <p className="text-sm font-semibold text-gray-900 m-0">{toTitleCase(districtMain)}</p>
          {districtSub && <p className="text-xs text-gray-400 m-0">{toTitleCase(districtSub)}</p>}
        </div>
      );
    },
  },
  {
    key: "source",
    label: "Source",
    width: "140px",
    render: (value) => {
      const sourceData = getSourceIcon(value);
      return (
        <div className={`inline-flex items-center gap-1.5 border border-gray-200 px-2.5 py-1 rounded-lg ${sourceData.bg}`}>
          <span className={`${sourceData.color}`}>{sourceData.icon}</span>
          <span className="text-xs font-medium text-gray-600">{toTitleCase(value || "Unknown")}</span>
        </div>
      );
    },
  },
];

export default function MyLeadsTable({ data = [], onRowClick, isLoading }) {
  const columns = getColumns(onRowClick);

  // Replicate mobile card view matching TelecallerLeadsTable layout
  const renderMobileCard = (row, index) => {
    return (
      <div
        key={row.enquiryNo || index}
        onClick={() => onRowClick && onRowClick(row)}
        className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 overflow-hidden">
            {columns.find(c => c.key === 'name')?.render(row.name, row)}
          </div>
          <div className="text-right flex flex-col items-end gap-2 shrink-0">
            {columns.find(c => c.key === 'status')?.render(row.status, row)}
            <span className="text-xs font-semibold text-gray-400">#{row.enquiryNo}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50 mt-1">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Course</span>
            <span className="text-sm font-medium text-gray-700 truncate">
              {columns.find(c => c.key === 'course')?.render(row.course, row)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Opinion</span>
            <span className="text-sm truncate">
              {columns.find(c => c.key === 'opinion')?.render(row.opinion, row)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      rowKey="enquiryNo"
      selectable={false}
      onRowClick={onRowClick}
      loading={isLoading}
      renderMobileCard={renderMobileCard}
      renderRowActions={(row) => (
        <ActionMenu
          actions={[
            {
              label: "View Lead",
              onClick: () => onRowClick && onRowClick(row),
            },
          ]}
        />
      )}
    />
  );
}
