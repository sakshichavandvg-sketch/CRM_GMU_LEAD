"use client";

import { useState } from "react";
import ManagementHeader from "@/components/management/ManagementHeader";
import UsersTable from "@/features/users/UsersTable";
import AddUserDialog from "@/features/users/components/AddUserDialog";
import { Plus } from "lucide-react";

export default function UserDirectoryPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const customActions = (
    <button
      onClick={() => setIsAddOpen(true)}
      className="h-[44px] rounded-xl bg-[#6F1D28] px-5 text-white flex items-center gap-2 hover:bg-[#5a1620] transition font-medium"
    >
      <Plus size={18} />
      Add Telecaller
    </button>
  );

  return (
    <>
      <ManagementHeader 
        title="Telecaller Directory" 
        description="Manage telecallers, assignments and account access." 
        activeTab="users" 
        actions={customActions}
      />
      <UsersTable />
      
      <AddUserDialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
    </>
  );
}
