"use client";
import { useState, useRef, useEffect } from "react";
import { apiFetch } from "@/lib/api";

const STATUS_OPTIONS = [
  {
    value: "todo",
    label: "To-do",
    color: "bg-gray-500/10 text-gray-500",
    hover: "hover:bg-gray-500/20",
  },
  {
    value: "doing",
    label: "Doing",
    color: "bg-yellow-500/10 text-yellow-500",
    hover: "hover:bg-yellow-500/20",
  },
  {
    value: "done",
    label: "Done",
    color: "bg-green-500/10 text-green-500",
    hover: "hover:bg-green-500/20",
  },
];

export default function CustomStatusDropdown({ task, onUpdate }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleSelect = async (value, e) => {
    e.stopPropagation();
    if (value === task.status) {
      setOpen(false);
      return;
    }

    try {
      await apiFetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status: value }),
      });
      onUpdate && onUpdate(value); // update state parent
      setOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // close dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = STATUS_OPTIONS.find((s) => s.value === task.status);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Selected badge */}
      <button
        onClick={(e) => {
          toggleOpen(e);
        }}
        className={`px-4 py-2 rounded-full text-sm font-semibold ${current.color} flex items-center gap-1 shadow-sm hover:shadow-md transition`}
      >
        {current.label}
        <span className="ml-1 text-sm">▾</span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-(--background) rounded-xl shadow-lg z-50">
          {STATUS_OPTIONS.map((s) => (
            <div
              key={s.value}
              onClick={(e) => handleSelect(s.value, e)}
              className={`px-3 py-2 cursor-pointer text-sm font-medium ${s.hover} ${s.color}`}
            >
              {s.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
