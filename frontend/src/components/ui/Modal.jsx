"use client";

import { useEffect, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Modal({
  open,
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  footer,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
}) {
  const visible = open ?? isOpen;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && visible) {
        onClose?.();
      }
    },
    [visible, onClose]
  );

  useEffect(() => {
    if (!visible) return;

    // Prevent scrolling background body content while modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible, handleKeyDown]);

  if (!mounted || !visible) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return createPortal(
    <div
      className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`
          w-full
          ${sizes[size] || sizes.md}
          max-h-[90vh]
          sm:max-h-[85vh]
          rounded-2xl
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          flex
          flex-col
          overflow-hidden
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title !== null && title !== undefined && (
          <div className={`flex items-center justify-between border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4 ${headerClassName}`}>
            <h2
              id="modal-title"
              className="text-xl font-semibold text-[var(--primary)]"
            >
              {title}
            </h2>

            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-black"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-6 ${bodyClassName}`}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className={`flex flex-col gap-3 border-t border-gray-200 px-4 py-3 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:py-4 ${footerClassName}`}>
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}