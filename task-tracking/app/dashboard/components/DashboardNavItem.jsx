"use client";

import clsx from "clsx";

export default function DashboardNavItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "group flex items-center gap-3 rounded-lg px-4 py-2 cursor-pointer transition-all duration-200",
        active
          ? "bg-(--accent) text-white shadow-sm"
          : "text-(--text) hover:bg-(--component-hover) hover:text-white"
      )}
    >
      {Icon && (
        <Icon
          size={18}
          className={clsx(
            "transition-colors duration-200",
            active ? "text-white" : "text-gray-400 group-hover:text-white"
          )}
        />
      )}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
