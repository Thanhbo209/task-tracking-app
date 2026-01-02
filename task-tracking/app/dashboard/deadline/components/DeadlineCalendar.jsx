import { formatDeadline } from "@/lib/formatDate";

export default function DeadlineCalendar({ tasks, onSelectTask }) {
  const today = new Date();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tasks.map((task) => {
        const isOverdue = new Date(task.deadline) < today;

        return (
          <button
            key={task._id}
            onClick={() => onSelectTask(task)}
            className={`
              group relative flex flex-col gap-2
              p-4 rounded-xl text-left
              border transition-all duration-200
              shadow-sm hover:shadow-lg
              hover:-translate-y-1
              ${
                isOverdue
                  ? "border-red-300 bg-red-50/60 hover:bg-red-50"
                  : "border-(--border) bg-(--card) hover:bg-(--component)"
              }
            `}
          >
            {/* Title */}
            <p className="font-semibold text-sm text-(--text) line-clamp-2">
              {task.title}
            </p>

            {/* Deadline */}
            <p
              className={`text-xs font-medium ${
                isOverdue ? "text-red-600" : "text-(--des)"
              }`}
            >
              {formatDeadline(task.deadline)}
            </p>

            {/* Status dot */}
            <span
              className={`
                absolute top-3 right-3 h-2.5 w-2.5 rounded-full
                ${isOverdue ? "bg-red-500" : "bg-green-400"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
}
