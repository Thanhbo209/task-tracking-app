export default function TaskHeader({ onAdd }) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <button
        onClick={onAdd}
        className="px-4 py-2 bg-(--accent) text-white rounded-lg hover:bg-(--accent)/75 transition hover:-translate-y-1"
      >
        + New Task
      </button>
    </div>
  );
}
