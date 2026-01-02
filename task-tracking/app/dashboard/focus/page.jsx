"use client";
import { useEffect, useState } from "react";
import PomodoroForm from "@/app/dashboard/focus/components/PomodoroForm";
import PomodoroCard from "@/app/dashboard/focus/components/PomodoroCard";
import { apiFetch } from "@/lib/api";
import TaskItem from "@/app/dashboard/tasks/components/TaskItem";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/i18n";

export default function PomodoroPage() {
  const [allPomodoros, setAllPomodoros] = useState([]);
  const [pomodoro, setPomodoro] = useState(null);
  const { lang } = useLanguage();
  const t = translations[lang].pomodoro;
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(true);

  // Fetch Pomodoro hiện tại
  const fetchCurrent = async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/api/pomodoro/current");
      setPomodoro(data.pomodoro || null);
    } catch (err) {
      console.error("Fetch current pomodoro error:", err.message);
      setPomodoro(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tất cả Pomodoro
  const fetchAllPomodoros = async () => {
    try {
      const data = await apiFetch("/api/pomodoro");
      setAllPomodoros(data.pomodoros || []);
    } catch (err) {
      console.error("Fetch all pomodoros error:", err.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await apiFetch("/api/tasks");
      // API trả về mảng task trực tiếp
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch tasks error:", err.message);
      setTasks([]);
    }
  };

  const activeTasks = tasks.filter((t) => t.status !== "done" && !t.completed);

  const doneTasks = tasks.filter((t) => t.status === "done" || t.completed);

  useEffect(() => {
    fetchCurrent();
    fetchAllPomodoros();
    fetchTasks();
  }, []);

  const todayMinutes = allPomodoros
    .filter((p) => {
      if (!p.completed || !p.endTime) return false;

      const today = new Date();
      const end = new Date(p.endTime);

      return (
        end.getDate() === today.getDate() &&
        end.getMonth() === today.getMonth() &&
        end.getFullYear() === today.getFullYear()
      );
    })
    .reduce((sum, p) => {
      const seconds = (new Date(p.endTime) - new Date(p.startTime)) / 1000;
      return sum + Math.floor(seconds / 60);
    }, 0);

  // Start Pomodoro
  const startPomodoro = async ({ taskId, duration }) => {
    try {
      await apiFetch("/api/pomodoro/start", {
        method: "POST",
        body: { taskId, duration },
      });
      fetchCurrent();
      fetchAllPomodoros();
      setOpenForm(false);
    } catch (err) {
      console.error("Start pomodoro error:", err.message);
    }
  };

  // End Pomodoro
  const endPomodoro = async (pomodoroId) => {
    try {
      await apiFetch("/api/pomodoro/end", {
        method: "POST",
        body: { pomodoroId },
      });
      fetchCurrent();
      fetchAllPomodoros();
    } catch (err) {
      console.error("End pomodoro error:", err.message);
    }
  };

  const completedPomodoros = allPomodoros.filter((p) => p.completed === true);
  const today = new Date();

  const todayPomodoros = completedPomodoros.filter((p) => {
    if (!p.endTime) return false;

    const end = new Date(p.endTime);
    return (
      end.getDate() === today.getDate() &&
      end.getMonth() === today.getMonth() &&
      end.getFullYear() === today.getFullYear()
    );
  });

  const todayTaskCount = new Set(todayPomodoros.map((p) => p.taskId?._id)).size;

  return (
    <div className="mx-auto p-4 flex flex-col gap-6">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t.title}</h1>
      </div>

      {/* Modal Form */}
      {openForm && (
        <PomodoroForm
          onStart={startPomodoro}
          onClose={() => setOpenForm(false)}
          tasks={tasks}
        />
      )}

      {/* Current Pomodoro */}
      <div className="w-full flex flex-col items-center gap-4">
        {loading ? (
          <p className="text-gray-500">{t.loading}</p>
        ) : pomodoro ? (
          <div className="w-full bg-(--accent) shadow-lg rounded-2xl p-6 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">{t.current}</h2>

            <PomodoroCard pomodoro={pomodoro} onEnd={endPomodoro} />
          </div>
        ) : (
          <div
            onClick={() => setOpenForm(true)}
            className="w-full h-60 bg-(--accent) rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-101 shadow-lg"
          >
            <span className="text-4xl text-gray-400 dark:text-gray-300 font-bold">
              +
            </span>
            <p className="mt-2 text-gray-600 dark:text-gray-200">
              {t.startNew}
            </p>
          </div>
        )}
      </div>

      {/* Main Section */}
      <div className="w-full flex mt-10 gap-6">
        {/* LEFT: Stats */}
        <div className="w-1/3 flex flex-col gap-4">
          {/* Focused minutes */}
          <div className="bg-(--component) rounded-xl flex-1 p-6 flex  items-center justify-between gap-3 border border-(--border)">
            <p className="text-xl font-bold">{t.focusedToday}</p>

            {/* Circle */}
            <div className=" w-38 h-38 rounded-full border-4 border-green-400 flex items-center justify-center gap-3">
              <span className="text-4xl font-semibold text-(--text)">
                {todayMinutes}
              </span>
              <p className="text-sm text-(--des)">{t.minutes}</p>
            </div>
          </div>

          {/* Tasks focused */}
          <div className="bg-(--component) rounded-xl flex-1 p-6 flex items-center justify-between gap-3 border border-(--border)">
            <p className="text-xl font-bold">{t.tasksFocused}</p>

            {/* Circle */}
            <div className=" w-38 h-38 rounded-full border-4 border-(--accent) flex items-center gap-3 justify-center">
              <span className="text-4xl font-semibold text-(--text)">
                {todayTaskCount}
              </span>
              <p className="text-sm text-(--des)">{t.tasks}</p>
            </div>
          </div>
        </div>

        {/* RIGHT: Task List */}
        <div className="w-2/3 flex flex-col gap-4 bg-(--component) p-6 rounded-xl border border-(--border)">
          <h2 className="text-lg font-semibold text-(--text)">Tasks</h2>

          {/* Active tasks */}
          <div className="flex flex-col gap-2 max-h-64 ">
            <h3 className="text-xs font-semibold text-(--des) uppercase tracking-wide">
              {t.uncompleted}
            </h3>

            {activeTasks.length > 0 ? (
              activeTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onEdit={(t) => {
                    if (!pomodoro) {
                      setSelectedTask(t);
                      setOpenForm(true);
                    }
                  }}
                  onStatusChange={(id, status) =>
                    console.log("Status change", id, status)
                  }
                  className={
                    pomodoro
                      ? "pointer-events-none cursor-not-allowed opacity-50"
                      : ""
                  }
                />
              ))
            ) : (
              <p className="text-sm text-(--des) text-center py-4">
                {t.noActiveTasks}
              </p>
            )}
          </div>

          {/* Done tasks */}
          {doneTasks.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-(--des) uppercase tracking-wide mb-2">
                {t.completed}
              </h3>

              <div className="flex flex-col gap-2">
                {doneTasks.map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={() => {}}
                    onStatusChange={() => {}}
                    className="pointer-events-none opacity-40 grayscale"
                  />
                ))}
              </div>
            </div>
          )}

          {pomodoro && (
            <p className="text-center text-xs text-(--des) mt-2">
              {t.alreadyActive}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
