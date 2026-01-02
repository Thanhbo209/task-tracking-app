"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { translations } from "@/lib/i18n";

export default function SettingsPage() {
  const { lang, changeLanguage } = useLanguage();
  const { theme, changeTheme } = useTheme();
  const t = translations[lang];

  return (
    <div className="p-6  mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{t.settings}</h1>

      {/* Language */}
      <div className="rounded-2xl  p-5 flex flex-col gap-4">
        <label className="font-medium">{t.chooseLanguage}</label>

        <div className="flex gap-4">
          <button
            onClick={() => changeLanguage("vi")}
            className={`px-4 py-2 rounded-xl  transition
              ${
                lang === "vi"
                  ? "bg-blue-600 text-white "
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            🇻🇳 {t.vietnamese}
          </button>

          <button
            onClick={() => changeLanguage("en")}
            className={`px-4 py-2 rounded-xl  transition
              ${
                lang === "en"
                  ? "bg-blue-600 text-white "
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            🇺🇸 {t.english}
          </button>
        </div>
      </div>

      {/* Theme */}
      <div className="rounded-2xl  p-5 flex flex-col gap-4">
        <label className="font-medium">{t.theme}</label>

        <div className="flex gap-4">
          <button
            onClick={() => changeTheme("light")}
            className={`px-4 py-2 rounded-xl  transition
              ${
                theme === "light"
                  ? "bg-yellow-400 text-black "
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            ☀️ {t.light}
          </button>

          <button
            onClick={() => changeTheme("dark")}
            className={`px-4 py-2 rounded-xl  transition
              ${
                theme === "dark"
                  ? "bg-gray-900 text-white "
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            🌙 {t.dark}
          </button>
        </div>
      </div>
    </div>
  );
}
