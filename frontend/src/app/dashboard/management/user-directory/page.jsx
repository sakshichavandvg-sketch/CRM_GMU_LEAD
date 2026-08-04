"use client";

import { useState } from "react";
import UsersTable from "@/features/users/UsersTable";
import AddUserDialog from "@/features/users/components/AddUserDialog";
import UserDirectoryHeader from "@/features/users/components/UserDirectoryHeader";

export default function UserDirectoryPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <UserDirectoryHeader onAddClick={() => setIsAddOpen(true)} />
      <UsersTable />
      
      <AddUserDialog
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
    </>
  );
}
