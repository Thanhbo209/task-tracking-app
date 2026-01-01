"use client";

import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import FilterTask from "./FilterTask";
import { apiFetch } from "@/lib/api";

export default function TaskList({ onEdit, reload }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    deadline: "all",
    focus: "all",
  });

  // Fetch tất cả tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/tasks");
      setTasks(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [reload]);

  // Filter tasks theo filter object
  const filteredTasks = tasks.filter((task) => {
    const now = new Date();

    // Filter theo status
    if (filters.status !== "all" && task.status !== filters.status)
      return false;

    // Filter theo deadline
    if (filters.deadline !== "all" && task.deadline) {
      const taskDate = new Date(task.deadline);
      if (filters.deadline === "today") {
        const isToday = taskDate.toDateString() === now.toDateString();
        if (!isToday) return false;
      }
      if (filters.deadline === "overdue" && taskDate >= now) return false;
      // Thêm các điều kiện khác nếu cần (this_week, this_month)
    }

    // Filter theo focus
    if (filters.focus !== "all" && task.focus !== filters.focus) return false;

    return true;
  });

  // Chia tasks theo cột status
  const statuses = ["todo", "doing", "done"];
  const tasksByStatus = statuses.reduce((acc, status) => {
    acc[status] = filteredTasks.filter((task) => task.status === status);
    return acc;
  }, {});

  if (loading) return <p>Loading tasks...</p>;
  if (!tasks.length) return <p>No tasks found</p>;

  return (
    <div>
      {/* Filter */}
      <FilterTask onChange={setFilters} />

      {/* Task Columns */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-4">
        {statuses.map((status, index) => {
          // Nếu filter status khác all thì chỉ hiển thị cột đó
          if (filters.status !== "all" && status !== filters.status)
            return null;

          return (
            <div
              key={status}
              className={`flex flex-col gap-4 0 ${
                index !== 0 ? "border-l border-(--border) pl-4 " : ""
              }`}
            >
              <h3 className="text-lg font-semibold capitalize">
                {status === "todo"
                  ? "To Do"
                  : status === "doing"
                  ? "In Progress"
                  : "Done"}
              </h3>

              {tasksByStatus[status].length > 0 ? (
                tasksByStatus[status].map((task) => (
                  <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onStatusChange={(id, newStatus) => {
                      setTasks((prev) =>
                        prev.map((t) =>
                          t._id === id ? { ...t, status: newStatus } : t
                        )
                      );
                    }}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No tasks</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
