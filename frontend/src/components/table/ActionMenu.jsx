"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

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

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 hover:bg-gray-100 transition"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            mt-2
            w-48
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-lg
            z-50
            overflow-hidden
          "
        >
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                setOpen(false);
                action.onClick();
              }}
              className="
                w-full
                px-4
                py-3
                text-left
                text-sm
                hover:bg-gray-50
                transition
              "
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}