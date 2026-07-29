"use client";

import { useState, useRef } from "react";
import { Edit2, UserCheck, UserX, Loader2, Mail, Phone as PhoneIcon, Building, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import { env } from "@/config/env";
import EditUserDialog from "../EditUserDialog";
import useUpdateTelecallerStatus from "@/features/users/hooks/useUpdateTelecallerStatus";
import useUploadTelecallerAvatar from "@/features/users/hooks/useUploadTelecallerAvatar";

export default function TelecallerHeader({ profile }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { mutate: updateStatus, isPending: isUpdatingStatus } = useUpdateTelecallerStatus(profile?.empId);

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

  if (!profile) return null;

  return (
    <div className="bg-white px-6 py-6 rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        
        {/* Profile Info */}
        <div className="flex items-start md:items-center gap-6">
          <div 
            className={`h-24 w-24 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-md shrink-0 relative group ${isUploadingAvatar ? 'opacity-70' : 'cursor-pointer'}`}
            onClick={handleAvatarClick}
          >
            {isUploadingAvatar && (
              <div className="absolute inset-0 z-10 bg-black/30 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
            {profile.avatar ? (
              <img
                key={profile.avatar}
                src={profile.avatar.startsWith('http') ? profile.avatar : `${env.NEXT_PUBLIC_API_URL}${profile.avatar.startsWith('/') ? '' : '/'}${profile.avatar}`}
                alt={profile.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="h-full w-full flex items-center justify-center bg-[#7A1F2B]/5 text-[#7A1F2B] font-bold text-3xl uppercase"
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
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{profile.name}</h1>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#7A1F2B]/10 text-[#7A1F2B]">
                {profile.role}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  profile.status === "ACTIVE"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {profile.status === "ACTIVE" ? "Active" : "Inactive"}
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3 text-sm text-gray-500 font-medium">
              {profile.email && (
                <div className="flex items-center gap-1.5">
                  <Mail size={14} className="text-gray-400" />
                  {profile.email}
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-1.5">
                  <PhoneIcon size={14} className="text-gray-400" />
                  {profile.phone}
                </div>
              )}
              {profile.department && (
                <div className="flex items-center gap-1.5">
                  <Building size={14} className="text-gray-400" />
                  {profile.department}
                </div>
              )}
              {profile.joiningDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-gray-400" />
                  Joined {profile.joiningDate}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-10 px-4 rounded-xl border-[#ECECEC] text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            onClick={() => setIsEditOpen(true)}
          >
            <Edit2 size={16} />
            Edit User
          </Button>
          <button
            title={profile.status === "ACTIVE" ? "Deactivate User" : "Activate User"}
            onClick={handleToggleStatus}
            disabled={isUpdatingStatus}
            className={`flex items-center gap-2 h-10 px-4 rounded-xl font-medium transition-colors border ${
              profile.status === "ACTIVE"
                ? "border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100"
                : "border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
            } ${isUpdatingStatus ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {profile.status === "ACTIVE" ? <UserX size={16} /> : <UserCheck size={16} />}
            {profile.status === "ACTIVE" ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>

      <EditUserDialog
        open={isEditOpen}
        user={profile}
        onClose={() => setIsEditOpen(false)}
      />
    </div>
  );
}
