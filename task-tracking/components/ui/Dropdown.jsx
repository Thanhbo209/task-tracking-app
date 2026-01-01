"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-(--border) rounded-3xl px-4 py-2 flex justify-between items-center bg-(--background) hover:ring-1 focus:ring-2 focus:ring-(--accent)"
      >
        <span>{selected ? selected.label : placeholder}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 w-full bg-(--component) rounded shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`cursor-pointer px-3 py-2 hover:bg-(--hover) flex items-center gap-2 ${
                value === opt.value ? "bg-(--accent) text-white font-bold" : ""
              }`}
            >
              {opt.icon && <span>{opt.icon}</span>}
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
