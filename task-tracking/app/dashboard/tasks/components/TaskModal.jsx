import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import Input from "@/components/ui/Input";
import { TASK_ICONS } from "@/lib/taskIcons";
import { TASK_COLORS } from "@/lib/taskColors";
import Dropdown from "@/components/ui/Dropdown";

export default function TaskModal({ open, onClose, task, onSuccess }) {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("todo");
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("clipboard");
  const [color, setColor] = useState("blue");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!task) return;

    setTitle(task.title);
    setDescription(task.description || "");
    setDeadline(task.deadline?.slice(0, 10) || "");
    setStatus(task.status);
    setIcon(task.icon || "clipboard");
    setColor(task.color || "blue");
  }, [task]);

  const handleSubmit = async () => {
    const taskId = task?._id; // 🔒 snapshot an toàn

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        icon,
        color,
        status: taskId ? status : "todo",
        ...(deadline && { deadline }),
      };

      console.log("PAYLOAD SUBMIT:", payload);

      if (taskId) {
        // ✅ UPDATE
        await apiFetch(`/api/tasks/${taskId}`, {
          method: "PUT",
          body: payload,
        });
      } else {
        // ✅ CREATE
        await apiFetch("/api/tasks", {
          method: "POST",
          body: payload,
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-(--background) rounded-lg w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold">{task ? "Edit Task" : "New Task"}</h2>

        <Input
          label={"Task Name"}
          className="w-full border rounded px-3 py-2"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <label className="text-sm font-medium">Description</label>

          <textarea
            rows={3}
            placeholder="Describe this task..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
      w-full mt-1 px-3 py-2
      border rounded
      bg-(--background)
      resize-none
      focus:outline-none focus:ring-2 focus:ring-blue-500
    "
          />
        </div>

        <Input
          label={"DeadLine"}
          type="datetime-local"
          min={new Date().toISOString().slice(0, 16)} // YYYY-MM-DDTHH:mm
          className="w-full border rounded px-3 py-2"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="flex justify-between items-start my-10">
          {/* Color */}
          <div className="mb-4">
            <label className="text-sm font-medium mb-1 block">Color</label>
            <Dropdown
              value={color}
              onChange={setColor}
              placeholder="Select Color"
              options={Object.entries(TASK_COLORS).map(([key, style]) => ({
                value: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                icon: <div className={`w-4 h-4 rounded-full ${style.bg}`} />,
              }))}
              className="w-40"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="text-sm font-medium mb-1 block">Icon</label>
            <Dropdown
              value={icon}
              onChange={setIcon}
              placeholder="Select Icon"
              options={Object.entries(TASK_ICONS).map(([key, IconComp]) => ({
                value: key,
                label: key.charAt(0).toUpperCase() + key.slice(1),
                icon: <IconComp size={16} />,
              }))}
              className="w-40"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-(--accent) hover:bg-(--accent)/75 text-white rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
