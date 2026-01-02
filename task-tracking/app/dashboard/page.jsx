"use client";

import { useEffect, useState } from "react";
import ActivityHeatmap from "@/app/dashboard/components/ActivityHeatmap";
import DashboardCard from "@/app/dashboard/components/ui/DashboardCard";
import StatCircle from "@/app/dashboard/components/ui/StatCircle";
import { apiFetch } from "@/lib/api";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";

export default function DashboardHome() {
  const { lang } = useLanguage();
  const t = translations[lang].dashboard;

  const [stats, setStats] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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
            title={t.focusActivity}
            subtitle={t.focusSubtitle}
            rightSlot={
              <span className="text-xs text-(--des)">
                {new Date().getFullYear()}
              </span>
            }
          >
            <div className="h-full overflow-x-auto">
              <ActivityHeatmap
                year={new Date().getFullYear()}
                onSelectDate={setSelectedDate}
              />
            </div>
          </DashboardCard>
        </div>

        {/* ===== STAT CARDS ===== */}
        <div className="flex-1 flex flex-col gap-6">
          {stats && (
            <>
              <StatCircle
                label={t.focusedTime}
                value={stats.focusedTodayMinutes}
                unit={t.minutes}
                gradient="from-indigo-500 to-purple-500"
              />

              <StatCircle
                label={t.tasksFocused}
                value={stats.tasksFocusedToday}
                unit={t.tasks}
                gradient="from-emerald-500 to-teal-500"
              />

              <StatCircle
                label={t.focusStreak}
                value={stats.focusStreak}
                unit={t.days}
                gradient="from-yellow-500 to-red-500"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
