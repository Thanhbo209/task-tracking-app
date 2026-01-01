"use client";

import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

const breadcrumbMap = {
  dashboard: "Dashboard",
  tasks: "My Tasks",
  profile: "Profile",
  settings: "Settings",
};

export default function DashboardBreadcrumb({ collapsed }) {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean).slice(1); // bỏ "dashboard"

  return (
    <div
      className={clsx(
        "flex items-center gap-2 text-sm py-2 text-(--des) px-2",
        collapsed && "justify-center"
      )}
    >
      {!collapsed && (
        <span
          className="cursor-pointer hover:text-white"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </span>
      )}

      {segments.map((seg, index) => {
        const isLast = index === segments.length - 1;
        const href = `/dashboard/${segments.slice(0, index + 1).join("/")}`;

        return (
          <span key={href} className="flex items-center gap-2">
            {!collapsed && <span>&gt;</span>}
            {!collapsed && (
              <span
                onClick={() => router.push(href)}
                className={clsx(
                  "cursor-pointer capitalize",
                  isLast ? "text-white font-medium" : "hover:text-white"
                )}
              >
                {breadcrumbMap[seg] || seg}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
