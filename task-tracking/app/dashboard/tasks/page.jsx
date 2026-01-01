"use client";

import { useState } from "react";
import TaskHeader from "./components/TaskHeader";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModal";

export default function TasksPage() {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [reload, setReload] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <TaskHeader
        onAdd={() => {
          setSelectedTask(null);
          setOpen(true);
        }}
      />

      <TaskList
        reload={reload}
        onEdit={(task) => {
          setSelectedTask(task);
          setOpen(true);
        }}
      />

      <TaskModal
        open={open}
        task={selectedTask}
        onClose={() => setOpen(false)}
        onSuccess={() => setReload(!reload)}
      />
    </div>
  );
}
