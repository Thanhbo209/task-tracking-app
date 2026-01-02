// app/deadline/hooks/useDeadlines.js
"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export function useDeadlines() {
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDeadlines = async () => {
      try {
        const [overdue, upcoming] = await Promise.all([
          apiFetch("/api/tasks/overdue"),
          apiFetch("/api/tasks/upcoming"),
        ]);

        setOverdueTasks(overdue);
        setUpcomingTasks(upcoming);
      } catch (err) {
        setError(err.message || "Fetch deadlines failed");
      } finally {
        setLoading(false);
      }
    };

    fetchDeadlines();
  }, []);

  return {
    overdueTasks,
    upcomingTasks,
    loading,
    error,
  };
}
