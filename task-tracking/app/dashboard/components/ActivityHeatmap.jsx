"use client";

import { useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ActivityCalendar({ onSelectDate }) {
  const today = new Date();

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-11
  const [activeSet, setActiveSet] = useState(new Set());
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchDayStats = async (dateStr) => {
    try {
      const data = await apiFetch(`/api/activity-days/${dateStr}`);
      setSelectedDate(dateStr);
      if (onSelectDate) onSelectDate(dateStr, data);
    } catch (err) {
      console.error(err.message);
      setSelectedDate(dateStr);
      if (onSelectDate)
        onSelectDate(dateStr, { focusedMinutes: 0, focusedTasks: 0 });
    }
  };

  /* ================= FETCH ACTIVITY ================= */
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await apiFetch(`/api/activity-days?year=${year}`);
        setActiveSet(new Set(data.map((d) => d.date)));
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchActivity();
  }, [year]);

  /* ================= CALENDAR LOGIC ================= */
  const calendar = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startOffset = (firstDay.getDay() + 6) % 7;

    return {
      totalDays: lastDay.getDate(),
      startOffset,
    };
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
        <button onClick={prevMonth} className="px-2 py-1 rounded">
          ←
        </button>
        <h3 className="text-sm font-semibold">
          {new Date(year, month).toLocaleString("en-US", { month: "long" })}{" "}
          {year}
        </h3>
        <button onClick={nextMonth} className="px-2 py-1 rounded">
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-2 text-xs text-(--des) text-center">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty slots */}
        {Array.from({ length: calendar.startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Days */}
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
              title={dateStr}
              onClick={() => {
                fetchDayStats(dateStr);
              }}
              className={`
                h-9 w-9 flex items-center justify-center rounded-md text-sm cursor-pointer transition
                ${
                  hasActivity
                    ? "bg-green-400 text-black"
                    : "bg-(--card) text-(--des)"
                }
                ${isSelected ? "bg-blue-400 text-white" : ""}
              `}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Selected Day Label */}
      {selectedDate && (
        <div className="mt-4 p-4 bg-(--component) rounded-xl text-sm text-(--text)">
          <p>
            <strong>Selected Day:</strong> {selectedDate}
          </p>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 text-xs text-(--des)">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-green-400" />
          <span>Has activity</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-(--card)" />
          <span>No activity</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm bg-blue-400" />
          <span>Selected Day</span>
        </div>
      </div>
    </div>
  );
}
