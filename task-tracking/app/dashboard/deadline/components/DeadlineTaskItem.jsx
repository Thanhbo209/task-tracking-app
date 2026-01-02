import { Clock, RefreshCcw } from "lucide-react";

export default function DeadlineTaskItem({ task, onReschedule }) {
  return (
    <div className="flex justify-between items-center p-3 border rounded-lg">
      <div>
        <p className="font-medium">{task.title}</p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Clock size={14} /> {task.deadline}
        </p>
      </div>

      <button
        onClick={() => onReschedule(task)}
        className="text-blue-500 hover:text-blue-700"
      >
        <RefreshCcw size={18} />
      </button>
    </div>
  );
}
