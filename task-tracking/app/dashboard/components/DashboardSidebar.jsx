"use client";

import {
  LogOut,
  LayoutDashboard,
  ListTodo,
  User,
  Settings,
  Clock1,
  Focus,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import DashboardNavItem from "./DashboardNavItem";
import clsx from "clsx";
import DashboardBreadcrumb from "@/app/dashboard/components/ui/DashboardBreadcrumb";

export default function DashboardSidebar({ collapsed }) {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <aside
      className={clsx(
        "bg-(--component) flex flex-col justify-between rounded-xl p-4 shadow-md transition-color duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <nav className="space-y-5">
        <DashboardBreadcrumb collapsed={collapsed} />
        <DashboardNavItem
          icon={LayoutDashboard}
          label="Dashboard"
          active={pathname === "/dashboard"}
          collapsed={collapsed}
          onClick={() => router.push("/dashboard")}
        />

        <DashboardNavItem
          icon={ListTodo}
          label="My Tasks"
          active={pathname.startsWith("/dashboard/tasks")}
          collapsed={collapsed}
          onClick={() => router.push("/dashboard/tasks")}
        />
        <DashboardNavItem
          icon={Clock1}
          label="Deadline"
          active={pathname.startsWith("/dashboard/deadline")}
          collapsed={collapsed}
          onClick={() => router.push("/dashboard/deadline")}
        />
        <DashboardNavItem
          icon={Focus}
          label="Focus Mode"
          active={pathname.startsWith("/dashboard/focus")}
          collapsed={collapsed}
          onClick={() => router.push("/dashboard/focus")}
        />

        <DashboardNavItem
          icon={Settings}
          label="Settings"
          active={pathname.startsWith("/dashboard/settings")}
          collapsed={collapsed}
          onClick={() => router.push("/dashboard/settings")}
        />
      </nav>

      <button
        className="flex bg-(--secondary) justify-center p-2 rounded-lg hover:bg-gray-700"
        onClick={handleLogOut}
      >
        <LogOut size={18} />
      </button>
    </aside>
  );
}
