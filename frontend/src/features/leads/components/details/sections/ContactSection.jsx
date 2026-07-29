import { Mail, Phone } from "lucide-react";

export default function ContactSection({ data }) {
  if (!data?.contact) return null;
  const { mobile, email, address, district, state, pincode = "400001" } = data.contact;

  const locationStr = [district, state].filter(Boolean).join(", ");

  return (
    <dl className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Mobile Number</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 flex justify-between items-center">
          <span>{mobile || "N/A"}</span>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#8B1C31] hover:border-[#8B1C31] transition-colors"><Phone className="w-3.5 h-3.5" /></button>
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Email Address</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1 flex justify-between items-center">
          <span>{email || "N/A"}</span>
          <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#8B1C31] hover:border-[#8B1C31] transition-colors"><Mail className="w-3.5 h-3.5" /></button>
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Alternate Number</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1">—</dd>
      </div>
      <div className="flex items-start justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3 mt-0.5">Address</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1">
          {address || "Sample108, Sample45, Sample11"}
        </dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">City / State</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1">{locationStr || "Mumbai, Maharashtra"}</dd>
      </div>
      <div className="flex items-center justify-between">
        <dt className="text-xs text-slate-500 font-medium w-1/3">Pincode</dt>
        <dd className="text-sm font-semibold text-slate-900 flex-1">{pincode}</dd>
      </div>
    </dl>
  );
}
