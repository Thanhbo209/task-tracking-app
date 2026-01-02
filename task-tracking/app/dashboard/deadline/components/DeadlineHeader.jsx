import { useRouter } from "next/navigation";
import { Calendar, List, Timer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";

export default function DeadlineHeader({ view, setView }) {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang].deadlinePage;

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-7 justify-center items-center">
        <h1 className="text-2xl font-bold">{t.title}</h1>
      </div>
      <div className="flex gap-2">
        <div className="flex justify-center ">
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded ${view === "list" && "text-(--accent)"}`}
          >
            <List />
          </button>

          <button
            onClick={() => setView("calendar")}
            className={`p-2 rounded ${
              view === "calendar" && "text-(--accent)"
            }`}
          >
            <Calendar />
          </button>
        </div>
        <button
          onClick={() => router.push("/dashboard/focus")}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          <Timer size={18} /> Pomodoro
        </button>
      </div>
    </div>
  );
}
