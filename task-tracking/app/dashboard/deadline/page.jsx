"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";

import DeadlineHeader from "./components/DeadlineHeader";
import DeadlineSection from "./components/DeadlineSection";
import DeadlineCalendar from "./components/DeadlineCalendar";
import QuickRescheduleModal from "./components/QuickRescheduleModal";

export default function DeadlinePage() {
  const { lang } = useLanguage();
  const t = translations[lang].deadlinePage;

  const [overdueTasks, setOverdueTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [view, setView] = useState("list"); // list | calendar
  const [loading, setLoading] = useState(true);

  const fetchDeadlines = async () => {
    const [overdue, upcoming] = await Promise.all([
      apiFetch("/api/tasks/overdue"),
      apiFetch("/api/tasks/upcoming"),
    ]);
    setOverdueTasks(overdue);
    setUpcomingTasks(upcoming);
  };

  useEffect(() => {
    fetchDeadlines().finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">{t.loading}</div>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <DeadlineHeader view={view} setView={setView} />

      {view === "list" ? (
        <>
          <DeadlineSection
            title={t.overdue}
            tasks={overdueTasks}
            type="overdue"
            onReschedule={setSelectedTask}
          />
          <DeadlineSection
            title={t.upcoming}
            tasks={upcomingTasks}
            type="upcoming"
            onReschedule={setSelectedTask}
          />
        </>
      ) : (
        <DeadlineCalendar
          tasks={[...overdueTasks, ...upcomingTasks]}
          onSelectTask={setSelectedTask}
        />
      )}

      {selectedTask && (
        <QuickRescheduleModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSaved={fetchDeadlines}
        />
      )}
    </div>
  );
}
