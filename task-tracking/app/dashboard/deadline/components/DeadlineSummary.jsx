// components/DeadlineSummary.jsx
export default function DeadlineSummary({ overdue, upcoming, today }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <SummaryCard label="Overdue" value={overdue} color="red" />
      <SummaryCard label="Today" value={today} color="yellow" />
      <SummaryCard label="Upcoming" value={upcoming} color="green" />
    </div>
  );
}

function SummaryCard({ label, value, color }) {
  return (
    <div className={`rounded-xl border p-4 bg-${color}-50 flex flex-col gap-1`}>
      <span className="text-sm">{label}</span>
      <span className="text-2xl font-bold">{value}</span>
    </div>
  );
}
