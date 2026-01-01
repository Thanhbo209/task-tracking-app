"use client";

import { useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import { Circle } from "lucide-react";

export default function FilterTask({ onChange }) {
  const [status, setStatus] = useState("all");

  const handleStatus = (val) => {
    setStatus(val);
    onChange({ status: val });
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    {
      value: "todo",
      label: "To-do",
      icon: <Circle className="text-blue-500" />,
    },
    {
      value: "doing",
      label: "Doing",
      icon: <Circle className="text-yellow-500" />,
    },
    {
      value: "done",
      label: "Done",
      icon: <Circle className="text-green-500" />,
    },
  ];

  return (
    <div className="flex gap-4 mb-4">
      <Dropdown
        value={status}
        onChange={handleStatus}
        options={statusOptions}
        placeholder="Select Status"
        className="w-40"
      />
    </div>
  );
}
