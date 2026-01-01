"use client";

import { useEffect, useState } from "react";
import ActivityHeatmap from "@/app/dashboard/components/ActivityHeatmap";
import DashboardCard from "@/app/dashboard/components/ui/DashboardCard";
import { apiFetch } from "@/lib/api";
import StatCircle from "@/app/dashboard/components/ui/StatCircle";

export default function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null); // yyyy-mm-dd

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const url = selectedDate
          ? `/api/dashboard/stats?date=${selectedDate}`
          : "/api/dashboard/stats";
        const data = await apiFetch(url);
        setStats(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchStats();
  }, [selectedDate]);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* ===== TOP ROW ===== */}
      <div className="flex gap-6 items-stretch">
        {/* Heatmap */}
        <div className="flex-2">
          <DashboardCard
            className="h-full"
            title="Focus Activity"
            subtitle="Your focus consistency this year"
            rightSlot={
              <span className="text-xs text-(--des)">
                {new Date().getFullYear()}
              </span>
            }
          >
            <div className="h-full overflow-x-auto">
              <ActivityHeatmap
                year={new Date().getFullYear()}
                onSelectDate={(date) => setSelectedDate(date)}
              />
            </div>
          </DashboardCard>
        </div>

        {/* ===== STAT CARDS ===== */}
        <div className="flex-1 flex flex-col gap-6">
          {stats && (
            <>
              <StatCircle
                label="Focused Time"
                value={stats.focusedTodayMinutes}
                unit="minutes"
                gradient="from-indigo-500 to-purple-500"
              />

              <StatCircle
                label="Tasks Focused"
                value={stats.tasksFocusedToday}
                unit="tasks"
                gradient="from-emerald-500 to-teal-500 "
              />

              <StatCircle
                label="Focus Streak"
                value={stats.focusStreak}
                unit="days"
                gradient="from-yellow-500 to-red-500"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
