"use client";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";

export default function TaskHeader({ onAdd }) {
  const { lang } = useLanguage();
  const t = translations[lang].tasks;

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{t.title}</h1>

      <button
        onClick={onAdd}
        className="px-4 py-2 bg-(--accent) text-white rounded-lg
                   hover:bg-(--accent)/75 transition hover:-translate-y-1"
      >
        + {t.newTask}
      </button>
    </div>
  );
}
