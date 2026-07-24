"use client";

import { useState, useRef } from "react";
import { Edit2, UserCheck, UserX, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import EditUserDialog from "../EditUserDialog";
import useUpdateTelecallerStatus from "@/features/users/hooks/useUpdateTelecallerStatus";
import useUploadTelecallerAvatar from "@/features/users/hooks/useUploadTelecallerAvatar";

export default function TelecallerHeader({ profile, kpi }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateTelecallerStatus(profile?.empId, profile?.slNo);

  const handleToggleStatus = () => {
    if (!profile?.empId) return;
    const newStatus = profile.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    updateStatus(newStatus);
  };

  const fileInputRef = useRef(null);
  const { mutate: uploadAvatar, isPending: isUploadingAvatar } = useUploadTelecallerAvatar(profile?.empId);

  const handleAvatarClick = () => {
    if (!isUploadingAvatar) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadAvatar(file);
    }
    e.target.value = ""; // Reset input so same file can be selected again
  };

  if (!profile || !kpi) return null;

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-6 bg-white px-6 py-5 rounded-[22px] border border-gray-200 shadow-sm">
      <div className="flex items-center gap-5">
        <div 
          className={`h-20 w-20 rounded-full bg-gray-100 overflow-hidden border border-gray-200 shrink-0 relative group ${isUploadingAvatar ? 'opacity-70' : 'cursor-pointer'}`}
          onClick={handleAvatarClick}
        >
          {isUploadingAvatar && (
            <div className="absolute inset-0 z-10 bg-black/30 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className="h-full w-full flex items-center justify-center bg-primary/5 text-primary font-bold text-2xl uppercase"
            style={{ display: profile.avatar ? 'none' : 'flex' }}
          >
            {profile.name ? profile.name.substring(0, 2) : "UN"}
          </div>
          
          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-[10px] font-medium tracking-wide uppercase">Upload</span>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>
        <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              profile.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {profile.status === "ACTIVE" ? "Active" : "Inactive"}
          </span>
        </div>
        <p className="text-gray-500 mt-1">
          {profile.role} • {profile.department}
        </p>
        <div className="flex items-center gap-3 mt-4 text-sm text-gray-600">
          <div className="flex flex-col border border-gray-200 rounded-lg px-3 py-1.5 min-w-24">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Assigned</span>
            <span className="font-bold text-gray-900 leading-tight text-lg mt-0.5">{kpi.assignedLeads}</span>
          </div>
          <div className="flex flex-col border border-gray-200 rounded-lg px-3 py-1.5 min-w-24">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Converted</span>
            <span className="font-bold text-gray-900 leading-tight text-lg mt-0.5">{kpi.conversionRate}%</span>
          </div>
          <div className="flex flex-col border border-gray-200 rounded-lg px-3 py-1.5 min-w-24">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Pending</span>
            <span className="font-bold text-gray-900 leading-tight text-lg mt-0.5">{kpi.pendingFollowUps}</span>
          </div>
        </div>
      </div>
      </div>
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setIsEditOpen(true)}
        >
          <Edit2 size={16} />
          Edit User
        </Button>
        <button
          title={profile.status === "ACTIVE" ? "Deactivate User" : "Activate User"}
          onClick={handleToggleStatus}
          disabled={isUpdatingStatus}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
            profile.status === "ACTIVE"
              ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100"
              : "border-green-200 text-green-600 bg-green-50 hover:bg-green-100"
          } ${isUpdatingStatus ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {profile.status === "ACTIVE" ? <UserX size={16} /> : <UserCheck size={16} />}
          <span className="font-medium text-sm">{profile.status === "ACTIVE" ? "Deactivate" : "Activate"}</span>
        </button>
      </div>

      <EditUserDialog
        open={isEditOpen}
        user={profile}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}
