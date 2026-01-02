"use client";

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";

export default function ActivityCalendar({ onSelectDate }) {
  const { lang } = useLanguage();
  const t = translations[lang].calendar;

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [activeSet, setActiveSet] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchDayStats = async (dateStr) => {
    try {
      const data = await apiFetch(`/api/activity-days/${dateStr}`);
      setSelectedDate(dateStr);
      onSelectDate?.(dateStr, data);
    } catch {
      setSelectedDate(dateStr);
      onSelectDate?.(dateStr, { focusedMinutes: 0, focusedTasks: 0 });
    }
  };

  /* ================= FETCH ACTIVITY ================= */
  useEffect(() => {
    apiFetch(`/api/activity-days?year=${year}`)
      .then((data) => setActiveSet(new Set(data.map((d) => d.date))))
      .catch(console.error);
  }, [year]);

  /* ================= CALENDAR LOGIC ================= */
  const calendar = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = (firstDay.getDay() + 6) % 7;

    return { totalDays: lastDay.getDate(), startOffset };
  }, [year, month]);

  /* ================= NAVIGATION ================= */
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  /* ================= RENDER ================= */
  return (
    <div className="w-full max-w-xl mx-auto rounded-xl bg-(--background) p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth}>←</button>
        <h3 className="text-sm font-semibold">
          {new Date(year, month).toLocaleString(t.monthLocale, {
            month: "long",
          })}{" "}
          {year}
        </h3>
        <button onClick={nextMonth}>→</button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-4 text-xs text-(--des) text-center">
        {t.weekdays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-4 mb-7 ml-6">
        {Array.from({ length: calendar.startOffset }).map((_, i) => (
          <div key={i} />
        ))}

        {Array.from({ length: calendar.totalDays }).map((_, i) => {
          const day = i + 1;
          const dateStr = `${year}-${String(month + 1).padStart(
            2,
            "0"
          )}-${String(day).padStart(2, "0")}`;

          const isSelected = dateStr === selectedDate;
          const hasActivity = activeSet.has(dateStr);

          return (
            <div
              key={dateStr}
              onClick={() => fetchDayStats(dateStr)}
              className={`
                h-9 w-9 flex items-center justify-center rounded-md text-sm cursor-pointer
                ${hasActivity ? "bg-green-400 text-black" : "bg-(--card)"}
                ${isSelected ? "bg-blue-400 text-white" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Selected Day */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-(--component) rounded-xl text-sm">
          <strong>{t.selectedDay}:</strong> {selectedDate}
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex gap-4 text-xs text-(--des)">
        <Legend color="bg-green-400" label={t.hasActivity} />
        <Legend color="bg-(--card)" label={t.noActivity} />
        <Legend color="bg-blue-400" label={t.selectedDay} />
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-sm ${color}`} />
      <span>{label}</span>
    </div>
  );
}
