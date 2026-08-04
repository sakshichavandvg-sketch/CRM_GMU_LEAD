import React from "react";

export default function UserDirectoryTable({ users = [], onView }) {
  return (
    <div className="bg-white rounded-card ambient-shadow border border-[#E8EAF2] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F7F8FC] border-b border-[#E8EAF2]">
            <tr>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">SL NO</th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">ROLE</th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  NAME / EMAIL
                  <span className="material-symbols-outlined text-sm">unfold_more</span>
                </div>
              </th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  PHONE NO
                  <span className="material-symbols-outlined text-sm">unfold_more</span>
                </div>
              </th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  STATUS
                  <span className="material-symbols-outlined text-sm">unfold_more</span>
                </div>
              </th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  EMP ID
                  <span className="material-symbols-outlined text-sm">unfold_more</span>
                </div>
              </th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  USERNAME
                  <span className="material-symbols-outlined text-sm">unfold_more</span>
                </div>
              </th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  PROGRAMME
                  <span className="material-symbols-outlined text-sm">unfold_more</span>
                </div>
              </th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">COURSE</th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">DISCIPLINE</th>
              <th className="px-6 py-4 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8EAF2]">
            {users.map((user, index) => {
              const isAdmin = String(user.role || "").toLowerCase() === "admin";
              const isActive = String(user.status || "").toLowerCase() === "active";
              const roleDisplay = user.role || "Telecaller";
              
              return (
                <tr key={user.id || user.empId || index} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-6 py-4 font-table-body text-table-body text-on-surface-variant/80">{index + 1}</td>
                  
                  <td className="px-6 py-4">
                    {isAdmin ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-xs font-bold rounded-lg">
                        <span className="material-symbols-outlined text-sm">shield</span>
                        {roleDisplay}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-surface-container-highest text-on-surface-variant text-xs font-bold rounded-lg">
                        <span className="material-symbols-outlined text-sm">person</span>
                        {roleDisplay}
                      </span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">{user.name || "Unknown"}</span>
                      <span className="text-xs text-on-surface-variant/60">{user.email || "-"}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-on-surface">
                      <span className="material-symbols-outlined text-primary text-lg">call</span>
                      <span className="font-table-body text-table-body">{user.phoneNo || "-"}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E1FCEF] text-[#16A34A] text-xs font-bold rounded-full">
                        <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FCE8E8] text-[#DC2626] text-xs font-bold rounded-full">
                        <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
                        Inactive
                      </span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 font-table-body text-table-body text-on-surface-variant">{user.empId || "-"}</td>
                  <td className="px-6 py-4 font-table-body text-table-body text-on-surface-variant">{user.username || "-"}</td>
                  
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-black rounded uppercase">
                      {user.programme || "ALL"}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 font-table-body text-table-body text-on-surface-variant">{user.course || "-"}</td>
                  <td className="px-6 py-4 font-table-body text-table-body text-on-surface-variant">{user.discipline || "-"}</td>
                  
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => onView && onView(user)}
                      className="w-10 h-10 rounded-full hover:bg-surface-container text-on-surface-variant border border-[#E8EAF2] flex items-center justify-center transition-colors inline-flex"
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
