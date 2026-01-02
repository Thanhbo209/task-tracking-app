"use client";

import TaskDeadlineCard from "./TaskDeadlineCard";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";

export default function DeadlineSection({ tasks, type }) {
  const { lang } = useLanguage();
  const t = translations[lang];

  const titleMap = {
    overdue: t.overdueTasks,
    upcoming: t.upcomingTasks,
  };

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">{titleMap[type]}</h2>

        <span className="text-sm text-white bg-(--accent) px-4 py-1 rounded-2xl">
          {tasks.length} {t.task}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="text-gray-500 italic">{t.noTask}</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tasks.map((task) => (
            <TaskDeadlineCard key={task._id} task={task} type={type} />
          ))}
        </div>
      )}
    </section>
  );
}
