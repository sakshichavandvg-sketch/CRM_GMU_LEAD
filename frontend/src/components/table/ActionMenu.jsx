"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

/**
 * ActionMenu — standardized three-dots action menu for table rows.
 *
 * @param {Array} actions - [{ label, icon?, onClick, danger? }]
 */
export default function ActionMenu({ actions = [] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (actions.length === 0) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Row actions"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-1
            w-48
            rounded-xl
            border border-gray-200
            bg-white
            shadow-lg
            z-50
            overflow-hidden
            py-1
          "
        >
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                action.onClick();
              }}
              className={`
                w-full
                px-4 py-2.5
                text-left text-sm
                flex items-center gap-2.5
                transition-colors
                ${action.danger
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {action.icon && <span className="w-4 h-4 shrink-0">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}