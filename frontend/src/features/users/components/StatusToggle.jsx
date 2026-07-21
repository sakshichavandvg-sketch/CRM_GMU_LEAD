"use client";

import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import useToggleUser from "../useToggleUser";
import { useConfirm } from "@/hooks/useConfirm";

export default function StatusToggle({ user }) {
  const [isActive, setIsActive] = useState(user.status === "ACTIVE");

  // Sync with external state if it changes
  useEffect(() => {
    setIsActive(user.status === "ACTIVE");
  }, [user.status]);

  const { mutate, isPending } = useToggleUser({
    onError: () => {
      // Revert on error
      setIsActive(user.status === "ACTIVE");
    }
  });

  const confirm = useConfirm();

  const handleToggle = async () => {
    if (isPending) return;

    const actionText = isActive ? "Deactivate" : "Activate";
    
    const isConfirmed = await confirm({
      title: `${actionText} Telecaller?`,
      description: `Are you sure you want to ${actionText.toLowerCase()} this telecaller?`,
      confirmText: actionText,
      variant: isActive ? "warning" : "primary",
    });

    if (isConfirmed) {
      // Optimistic UI update
      setIsActive(!isActive);
      
      // Trigger mutation
      mutate(user.slNo);
    }
  };

  return (
    <button
      role="switch"
      aria-checked={isActive}
      disabled={isPending}
      onClick={handleToggle}
      className={`
        relative inline-flex h-[26px] w-[52px] flex-shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isActive ? 'bg-[#10b981] focus:ring-[#10b981]' : 'bg-[#6F1D28] focus:ring-[#6F1D28]'}
        ${isPending ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className="sr-only">Toggle status</span>
      <span
        className={`
          flex h-5 w-5 items-center justify-center rounded-full bg-white transition-transform duration-300 shadow-sm
          ${isActive ? 'translate-x-[25px]' : 'translate-x-1'}
        `}
      >
        {isActive ? (
          <Check size={12} className="text-[#10b981]" strokeWidth={3} />
        ) : (
          <X size={12} className="text-[#6F1D28]" strokeWidth={3} />
        )}
      </span>
    </button>
  );
}
