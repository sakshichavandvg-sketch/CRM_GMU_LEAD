import { PhoneCall, CalendarPlus, UploadCloud, Users } from "lucide-react";
import Link from "next/link";

const ActionSkeleton = () => (
  <div className="h-14 w-40 rounded-full bg-gray-50 animate-pulse border border-gray-100 shrink-0"></div>
);

const PrimaryActionCard = ({ icon: Icon, title, onClick }) => (
  <button 
    onClick={onClick} 
    className="flex items-center gap-3 px-5 py-3 bg-[#8B1538] text-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 outline-none focus:ring-4 focus:ring-[#8B1538]/30 group"
  >
    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
      <Icon size={16} strokeWidth={2.5} className="text-white" />
    </div>
    <span className="font-semibold text-sm whitespace-nowrap">{title}</span>
  </button>
);

const SecondaryActionCard = ({ icon: Icon, title, link, onClick }) => {
  const CardContent = (
    <div className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 text-gray-700 rounded-full shadow-sm hover:shadow-md hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer h-full">
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-gray-100 transition-colors">
        <Icon size={16} strokeWidth={2} className="text-gray-500 group-hover:text-gray-900 transition-colors" />
      </div>
      <span className="font-semibold text-sm whitespace-nowrap group-hover:text-gray-900 transition-colors">{title}</span>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block outline-none focus:ring-4 focus:ring-gray-100 rounded-full">
        {CardContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="block outline-none focus:ring-4 focus:ring-gray-100 rounded-full">
      {CardContent}
    </button>
  );
};

export default function QuickActions({ isLoading, onCallNextLead, onAddFollowup, onUploadDocs }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-900 px-1">Quick Actions</h2>
        <div className="flex flex-wrap gap-4 items-center">
          {[...Array(4)].map((_, i) => <ActionSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-900 px-1">Quick Actions</h2>
      <div className="flex flex-wrap gap-3 items-center">
        <PrimaryActionCard 
          icon={PhoneCall} 
          title="Call Next" 
          onClick={onCallNextLead}
        />
        <SecondaryActionCard 
          icon={CalendarPlus} 
          title="Add Followup" 
          onClick={onAddFollowup}
        />
        <SecondaryActionCard 
          icon={UploadCloud} 
          title="Upload Docs" 
          onClick={onUploadDocs}
        />
        <SecondaryActionCard 
          icon={Users} 
          title="My Leads" 
          link="/telecaller/leads" 
        />
      </div>
    </div>
  );
}
