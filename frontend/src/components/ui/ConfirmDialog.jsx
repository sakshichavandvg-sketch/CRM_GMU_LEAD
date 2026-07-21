"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, Trash2, Info, CheckCircle2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useConfirmStore } from "@/stores/confirmStore";

const variantConfig = {
  primary: {
    icon: CheckCircle2,
    iconColor: "text-[#6F1D28]",
    iconBg: "bg-[#fdf8f8]",
    buttonClass: "bg-[#6F1D28] hover:bg-[#5a1620] text-white",
  },
  danger: {
    icon: Trash2,
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    buttonClass: "bg-red-600 hover:bg-red-700 text-white",
  },
  warning: {
    icon: AlertTriangle,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    buttonClass: "bg-orange-600 hover:bg-orange-700 text-white",
  },
  info: {
    icon: Info,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
  }
};

export default function ConfirmDialog() {
  const { 
    isOpen, 
    options, 
    handleConfirm, 
    handleCancel,
    isConfirming 
  } = useConfirmStore();

  const confirmBtnRef = useRef(null);

  // Auto focus confirm button when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        confirmBtnRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Support Enter for confirmation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && isOpen && !isConfirming) {
        e.preventDefault();
        handleConfirm();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, isConfirming, handleConfirm]);

  const config = variantConfig[options.variant] || variantConfig.primary;
  const Icon = config.icon;

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        if (!isConfirming) handleCancel();
      }}
      size={options.size || "sm"}
      title={null} // Custom header
      footer={null} // Custom footer
    >
      <div className="flex flex-col items-center text-center p-2 sm:p-4">
        
        {/* Icon */}
        <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${config.iconBg} mb-4`}>
          <Icon className={`h-8 w-8 ${config.iconColor}`} aria-hidden="true" />
        </div>
        
        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-gray-900">
          {options.title}
        </h3>
        
        {/* Description */}
        {options.description && (
          <p className="mb-6 text-sm text-gray-500">
            {options.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex w-full flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="secondary"
            onClick={handleCancel}
            disabled={isConfirming}
            className="flex-1"
          >
            {options.cancelText}
          </Button>
          
          <button
            ref={confirmBtnRef}
            onClick={handleConfirm}
            disabled={isConfirming}
            className={`
              flex-1 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-[15px] font-semibold transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              ${config.buttonClass}
            `}
          >
            {options.confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
