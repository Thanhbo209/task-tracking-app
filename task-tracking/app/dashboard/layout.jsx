"use client";

import DashboardHeader from "./components/DashboardHeader";
import DashboardSidebar from "./components/DashboardSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  // Load theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    setDarkMode(isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-(--background) p-6 transition-color duration-300">
      <div className="flex min-h-[calc(100vh-3rem)] flex-col gap-6 rounded-2xl">
        <DashboardHeader darkMode={darkMode} onToggleTheme={toggleTheme} />

        <div className="flex flex-1 gap-6 min-h-0">
          <DashboardSidebar />

          <main className="flex-1 bg-(--component) rounded-xl p-6 shadow-md overflow-auto transition-color duration-300">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
