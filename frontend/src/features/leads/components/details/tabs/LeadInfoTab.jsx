import React from "react";
import { formatDisplayDate } from "@/utils/dateUtils";

export default function LeadInfoTab({ data, rawData }) {
  if (!data) return null;

  const leadName = data?.header?.name || "Unknown";
  const dob = rawData?.student?.dateOfBirth ? formatDisplayDate(rawData.student.dateOfBirth) : "N/A";
  const gender = rawData?.student?.gender || "N/A";
  const category = rawData?.student?.category || "N/A";
  const nationality = rawData?.student?.nationality || "Indian";
  const languages = rawData?.student?.languages?.join(", ") || "English, Hindi, Kannada";
  const address = data?.contact?.locationStr || "N/A";

  const telecallerName = data?.assignment?.telecaller || "Unassigned";
  const telecallerRole = "Telecaller";
  const assignedDate = formatDisplayDate(data?.assignment?.assignedDate) || "N/A";
  
  const totalCalls = rawData?.calls?.length || 0;
  const connectedCalls = rawData?.calls?.filter(c => c.status === "Connected")?.length || 0;
  const talkTime = "00:00"; 
  
  const calls = rawData?.calls || [];
  const activities = rawData?.timeline || rawData?.activities || [];

  return (
    <div className="flex flex-col gap-lg w-full">
      <section className="grid grid-cols-12 gap-lg w-full">
        {/* Personal Information */}
        <div className="col-span-5 premium-card rounded-lg flex flex-col h-fit">
          <div className="p-lg border-b border-outline-variant flex justify-between items-center">
            <div className="flex items-center gap-md">
              <span className="material-symbols-outlined text-primary">person</span>
              <h3 className="font-headline-sm text-headline-sm">Personal Information</h3>
            </div>
            <button className="p-sm hover:bg-surface-container-high rounded-full transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant">edit</span>
            </button>
          </div>
          <div className="p-lg grid grid-cols-1 gap-lg">
            <div className="flex justify-between items-center py-sm border-b border-surface-container">
              <p className="text-body-md text-on-surface-variant">Full Name</p>
              <p className="font-label-md text-on-surface">{leadName}</p>
            </div>
            <div className="flex justify-between items-center py-sm border-b border-surface-container">
              <p className="text-body-md text-on-surface-variant">Date of Birth</p>
              <p className="font-label-md text-on-surface">{dob}</p>
            </div>
            <div className="flex justify-between items-center py-sm border-b border-surface-container">
              <p className="text-body-md text-on-surface-variant">Gender</p>
              <p className="font-label-md text-on-surface">{gender}</p>
            </div>
            <div className="flex justify-between items-center py-sm border-b border-surface-container">
              <p className="text-body-md text-on-surface-variant">Category</p>
              <p className="font-label-md text-on-surface">{category}</p>
            </div>
            <div className="flex justify-between items-center py-sm border-b border-surface-container">
              <p className="text-body-md text-on-surface-variant">Nationality</p>
              <p className="font-label-md text-on-surface">{nationality}</p>
            </div>
            <div className="flex justify-between items-center py-sm border-b border-surface-container">
              <p className="text-body-md text-on-surface-variant">Languages</p>
              <p className="font-label-md text-on-surface">{languages}</p>
            </div>
            <div className="flex justify-between items-center py-sm border-b border-surface-container">
              <p className="text-body-md text-on-surface-variant">Address</p>
              <p className="font-label-md text-on-surface text-right">{address}</p>
            </div>
          </div>
          <button className="p-lg text-primary font-bold hover:bg-primary/5 transition-colors text-center border-t border-outline-variant flex items-center justify-center gap-sm">
            View More Details
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>

        {/* Right Column: Call Logs & Assigned Telecaller */}
        <div className="col-span-7 flex flex-col gap-lg">
          
          {/* Call Logs */}
          <div className="premium-card rounded-lg flex flex-col">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-primary">call_log</span>
                <h3 className="font-headline-sm text-headline-sm">Call Logs</h3>
              </div>
              <button className="text-primary font-bold text-label-md hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low text-label-sm text-on-surface-variant uppercase tracking-widest">
                  <tr>
                    <th className="px-lg py-md">Date & Time</th>
                    <th className="px-lg py-md">Called By</th>
                    <th className="px-lg py-md">Duration</th>
                    <th className="px-lg py-md">Status</th>
                    <th className="px-lg py-md">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {calls.length > 0 ? calls.slice(0, 3).map((call, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-lg py-md">
                        <p className="font-label-md text-on-surface">{formatDisplayDate(call.createdAt)}</p>
                        <p className="text-label-sm text-on-surface-variant">--:--</p>
                      </td>
                      <td className="px-lg py-md font-body-sm text-on-surface">{call.callerName || telecallerName}</td>
                      <td className="px-lg py-md font-body-sm text-on-surface">{call.duration || "00:00"}</td>
                      <td className="px-lg py-md">
                        <span className={`flex items-center gap-xs font-bold text-label-sm ${call.status === 'Connected' ? 'text-[#16A34A]' : 'text-error'}`}>
                          <span className="material-symbols-outlined text-sm">{call.status === 'Connected' ? 'check_circle' : 'cancel'}</span> {call.status}
                        </span>
                      </td>
                      <td className="px-lg py-md">
                        <span className={`px-md py-xs rounded-full text-label-sm ${call.status === 'Connected' ? 'bg-[#E6F4EA] text-[#137333]' : 'bg-surface-container-highest text-on-surface-variant'}`}>{call.outcome || "N/A"}</span>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-lg py-md text-center text-on-surface-variant">No call logs found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Assigned Telecaller */}
          <div className="premium-card rounded-lg p-lg">
            <div className="flex justify-between items-center mb-lg">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-primary">person_check</span>
                <h3 className="font-headline-sm text-headline-sm">Assigned Telecaller</h3>
              </div>
              <div className="text-right">
                <p className="text-label-sm text-on-surface-variant">Assigned On</p>
                <p className="font-label-md text-on-surface flex items-center gap-xs">{assignedDate} <span className="material-symbols-outlined text-sm">calendar_today</span></p>
              </div>
            </div>
            <div className="flex items-center gap-lg mb-lg p-md bg-surface-container-low rounded-lg">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold text-xl border-2 border-white shadow-sm">
                {telecallerName.charAt(0)}
              </div>
              <div>
                <h4 className="font-headline-sm text-on-surface">{telecallerName}</h4>
                <p className="text-body-md text-on-surface-variant">{telecallerRole}</p>
              </div>
              <div className="ml-auto flex gap-sm">
                <button className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">call</span>
                </button>
                <button className="w-10 h-10 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary/5 transition-colors">
                  <span className="material-symbols-outlined">mail</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-md">
              <div className="bg-surface-container-low p-md rounded-lg flex flex-col items-center">
                <span className="material-symbols-outlined text-primary mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
                <p className="font-headline-sm text-on-surface">{totalCalls}</p>
                <p className="text-label-sm text-on-surface-variant">Total Calls</p>
              </div>
              <div className="bg-surface-container-low p-md rounded-lg flex flex-col items-center">
                <span className="material-symbols-outlined text-[#16A34A] mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>call_made</span>
                <p className="font-headline-sm text-on-surface">{connectedCalls}</p>
                <p className="text-label-sm text-on-surface-variant">Connected</p>
              </div>
              <div className="bg-surface-container-low p-md rounded-lg flex flex-col items-center">
                <span className="material-symbols-outlined text-[#F59E0B] mb-xs" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                <p className="font-headline-sm text-on-surface">{talkTime}</p>
                <p className="text-label-sm text-on-surface-variant">Talk Time</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Recent Activity Timeline Card */}
      <section className="premium-card rounded-lg overflow-hidden mb-section_gap w-full">
        <div className="p-lg border-b border-outline-variant flex justify-between items-center">
          <div className="flex items-center gap-md">
            <span className="material-symbols-outlined text-primary">history</span>
            <h3 className="font-headline-sm text-headline-sm">Recent Activity</h3>
          </div>
          <button className="text-primary font-bold text-label-md hover:underline">View All</button>
        </div>
        <div className="p-lg flex flex-col gap-xl relative">
          <div className="absolute left-[44px] top-[48px] bottom-[48px] w-0.5 bg-outline-variant"></div>
          {activities.length > 0 ? activities.slice(0, 5).map((act, idx) => (
             <div key={idx} className="flex items-start gap-lg relative z-10">
               <div className="w-12 h-12 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#16A34A] flex-shrink-0 border-4 border-surface shadow-sm">
                 <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                   {act.type === 'CALL' ? 'call' : act.type === 'NOTE' ? 'edit_note' : 'add_circle'}
                 </span>
               </div>
               <div className="flex-1">
                 <div className="flex justify-between">
                   <h4 className="font-label-md text-on-surface">{act.title || "Activity logged"}</h4>
                   <span className="text-label-sm text-on-surface-variant">{formatDisplayDate(act.createdAt)}</span>
                 </div>
                 <p className="text-body-sm text-on-surface-variant mt-xs">{act.description}</p>
               </div>
             </div>
          )) : (
            <div className="text-on-surface-variant text-center py-md relative z-10 bg-surface">No recent activity.</div>
          )}
        </div>
      </section>
    </div>
  );
}
