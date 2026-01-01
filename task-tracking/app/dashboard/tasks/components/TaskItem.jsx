import { apiFetch } from "@/lib/api";
import { TASK_ICONS } from "@/lib/taskIcons";
import { TASK_COLORS } from "@/lib/taskColors";
import { Clock, Trash2, Eye } from "lucide-react";
import CustomStatusDropdown from "@/components/ui/CustomStatusDropdown";

export default function TaskItem({
  task,
  onEdit,
  onStatusChange,
  className = "",
}) {
  const colorStyle = TASK_COLORS[task.color] || TASK_COLORS.blue;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!confirm("Delete this task?")) return;

    try {
      await apiFetch(`/api/tasks/${task._id}`, { method: "DELETE" });
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleView = (e) => {
    e.stopPropagation();
    alert(`View task: ${task.title}`);
  };

  const Icon = TASK_ICONS[task.icon] || TASK_ICONS.clipboard;

  return (
    <div
      onClick={() => onEdit(task)}
      className={`
        relative
        rounded-lg
        bg-(--background)
        p-3
        shadow
        transition
        hover:scale-102
        cursor-pointer
        flex flex-col
        justify-between
        z-
        ${className}
      `}
      style={{ minHeight: "70px", maxHeight: "70px" }}
    >
      {/* Top: Icon & Status */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2 items-center justify-center">
          <div
            className={`p-3 rounded-full ${colorStyle.bg} ${colorStyle.text}`}
          >
            <Icon size={25} />
          </div>
          <div className="flex flex-col items-start">
            <h3 className={`text-sm font-semibold truncate ${colorStyle.text}`}>
              {task.title}
            </h3>

            {task.deadline && (
              <div className="flex items-center gap-1 justify-start text-xs text-gray-500 mt-1">
                <Clock className="w-3 h-3 " />
                <span className="font-medium">
                  {new Date(task.deadline).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 justify-center items-center z-50">
          <CustomStatusDropdown
            task={task}
            onUpdate={async (newStatus) => {
              try {
                await apiFetch(`/api/tasks/${task._id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ status: newStatus }),
                });

                // Cập nhật state parent để task chuyển cột
                onStatusChange(task._id, newStatus);
              } catch (err) {
                alert(err.message);
              }
            }}
          />

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <button
              onClick={handleView}
              className="text-(--primary) hover:text-(--primary)/75"
              title="View"
            >
              <Eye size={20} />
            </button>
            <button
              onClick={handleDelete}
              className="text-red-400 hover:text-red-500"
              title="Delete"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
