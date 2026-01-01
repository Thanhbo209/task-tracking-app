"use client";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

export default function PomodoroForm({ onStart, onClose, defaultTaskId }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(defaultTaskId || "");
  const [minutes, setMinutes] = useState(25);

  // Fetch tasks khi modal mở
  const fetchTasks = async () => {
    try {
      const data = await apiFetch("/api/tasks");
      const list = Array.isArray(data) ? data : data.tasks || [];
      setTasks(list);

      const defaultTask = list.find((t) => t._id === defaultTaskId);

      if (defaultTask && defaultTask.status !== "done") {
        setSelectedTask(defaultTaskId);
      } else {
        const firstActiveTask = list.find((t) => t.status !== "done");
        setSelectedTask(firstActiveTask?._id || "");
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = tasks.find((t) => t._id === selectedTask);

    if (!task) return;

    if (task.status === "done") {
      alert("This task is already completed. Please choose another task.");
      return;
    }

    if (minutes <= 0) return;

    onStart({ taskId: selectedTask, duration: minutes * 60 });
    setMinutes(25);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-(--background) rounded-2xl shadow-xl w-96 p-6 relative flex flex-col gap-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition text-lg"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-(--text)">
          Start Pomodoro
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Task select */}
          <select
            value={selectedTask}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-(--primary) text-(--text) bg-(--component) transition"
            required
          >
            <option value="" disabled>
              -- Select a task --
            </option>

            {tasks.map((task) => (
              <option
                key={task._id}
                value={task._id}
                disabled={task.status === "done"}
              >
                {task.title} {task.status === "done" && "(Done)"}
              </option>
            ))}
          </select>

          {/* Minutes input */}
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            min={1}
            className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-(--primary) text-(--text) bg-(--component) transition"
            required
          />

          {/* Submit button */}
          <button
            type="submit"
            className="bg-(--primary) hover:bg-(--primary)/80 text-white font-semibold p-3 rounded-lg shadow-md transition"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
}
