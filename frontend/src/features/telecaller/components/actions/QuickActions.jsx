import { PhoneCall, CalendarPlus, UploadCloud, Users } from "lucide-react";
import Link from "next/link";

const ActionSkeleton = () => (
  <div className="border border-[#ECECEC] rounded-[20px] p-6 flex flex-col items-center justify-center gap-3 h-full bg-white">
    <div className="w-14 h-14 rounded-2xl bg-slate-100 animate-pulse"></div>
    <div className="w-20 h-4 bg-slate-100 animate-pulse rounded"></div>
  </div>
);

const ActionCard = ({ icon: Icon, title, link, onClick }) => {
  const CardContent = (
    <div className="border border-[#ECECEC] rounded-[20px] p-6 flex flex-col items-center justify-center gap-3 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white hover:bg-[#7A1F2B]/5 group cursor-pointer h-full">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors bg-slate-50 group-hover:bg-[#7A1F2B]/10">
        <Icon size={28} strokeWidth={2} className="text-gray-500 group-hover:text-[#7A1F2B]" />
      </div>
      <span className="font-[600] text-gray-900 text-sm group-hover:text-[#7A1F2B]">{title}</span>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block w-full h-full outline-none focus:ring-2 focus:ring-[#7A1F2B] rounded-[20px]">
        {CardContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="block w-full h-full outline-none focus:ring-2 focus:ring-[#7A1F2B] rounded-[20px]">
      {CardContent}
    </button>
  );
};

export default function QuickActions({ isLoading, onCallNextLead, onAddFollowup, onUploadDocs }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
        <h2 className="text-[20px] font-[600] text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4 flex-1">
          {[...Array(4)].map((_, i) => <ActionSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
      <h2 className="text-[20px] font-[600] text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <ActionCard 
          icon={PhoneCall} 
          title="Call Next" 
          onClick={onCallNextLead}
        />
        <ActionCard 
          icon={CalendarPlus} 
          title="Add Followup" 
          onClick={onAddFollowup}
        />
        <ActionCard 
          icon={UploadCloud} 
          title="Upload Docs" 
          onClick={onUploadDocs}
        />
        <ActionCard 
          icon={Users} 
          title="My Leads" 
          link="/telecaller/leads" 
        />
      </div>
    </div>
  );
}
