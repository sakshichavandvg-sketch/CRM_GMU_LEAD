"use client";

import { Edit2, Power } from "lucide-react";

export default function UserTableActions({
  user,
  onEdit,
  onToggleStatus,
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onEdit(user)}
        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
        title="Edit User"
      >
        <Edit2 size={18} />
      </button>

      <button
        onClick={() => onToggleStatus(user)}
        className={`rounded-lg p-2 transition ${
          user.status === "ACTIVE"
            ? "text-red-600 hover:bg-red-50"
            : "text-green-600 hover:bg-green-50"
        }`}
        title={
          user.status === "ACTIVE"
            ? "Deactivate User"
            : "Activate User"
        }
      >
        <Power size={18} />
      </button>
    </div>
  );
}