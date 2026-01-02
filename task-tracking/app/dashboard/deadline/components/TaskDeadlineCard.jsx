import { Clock, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";

export default function TaskDeadlineCard({ task, type }) {
  const isOverdue = type === "overdue";

  const { lang } = useLanguage();
  const t = translations[lang] || translations.en;

  return (
    <div
      className="
        rounded-2xl border p-5
        transition-all duration-200
        hover:shadow-lg hover:-translate-y-0.5
        border-(--border)
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-(--foreground) leading-snug line-clamp-2">
          {task.title}
        </h3>

        <span
          className={`
            flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
            ${
              isOverdue
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }
          `}
        >
          {isOverdue ? <AlertTriangle size={14} /> : <Clock size={14} />}
          {isOverdue ? t.overdue : t.upcoming}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="mt-2 text-sm text-(--foreground) line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-white font-bold flex items-center gap-1">
          <Clock size={17} />
          {t.deadline}
        </span>

        <span
          className={`font-medium ${
            isOverdue ? "text-red-200" : "text-yellow-100"
          }`}
        >
          {new Date(task.deadline).toLocaleDateString(
            lang === "vi" ? "vi-VN" : "en-US"
          )}
        </span>
      </div>
    </div>
  );
}
