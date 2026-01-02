"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api";

function toDateInputValue(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toISOString().split("T")[0];
}
function todayInput() {
  return new Date().toISOString().split("T")[0];
}

export default function QuickRescheduleModal({ task, onClose, onSaved }) {
  const [date, setDate] = useState(toDateInputValue(task.deadline));
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);
      await apiFetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        body: { deadline: date },
      });
      onSaved();
      onClose();
    } catch (err) {
      console.error("Reschedule failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-(--background) p-6 rounded-lg w-96">
        <h2 className="font-bold mb-4">Reschedule Task</h2>

        <input
          type="date"
          value={date}
          min={todayInput()}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={!date || loading}
            className="px-4 py-2 bg-(--accent) text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
