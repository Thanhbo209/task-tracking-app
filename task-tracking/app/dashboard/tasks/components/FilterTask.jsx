"use client";

import { useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import { Circle } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";

export default function FilterTask({ onChange }) {
  const { lang } = useLanguage();
  const t = translations[lang].tasks.filter;

  const [status, setStatus] = useState("all");

  const handleStatus = (val) => {
    setStatus(val);
    onChange({ status: val });
  };

  const statusOptions = [
    { value: "all", label: t.all },
    {
      value: "todo",
      label: t.todo,
      icon: <Circle className="text-blue-500" />,
    },
    {
      value: "doing",
      label: t.doing,
      icon: <Circle className="text-yellow-500" />,
    },
    {
      value: "done",
      label: t.done,
      icon: <Circle className="text-green-500" />,
    },
  ];

  return (
    <div className="flex gap-4 mb-4">
      <Dropdown
        value={status}
        onChange={handleStatus}
        options={statusOptions}
        placeholder={t.placeholder}
        className="w-40"
      />
    </div>
  );
}
