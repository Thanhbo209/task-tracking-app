import DashboardCard from "@/app/dashboard/components/ui/DashboardCard";

function StatCircle({ label, value, unit, gradient }) {
  return (
    <DashboardCard className="flex-1 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Decorative circle */}
      <div
        className={`absolute w-32 h-32 rounded-full opacity-20 blur-2xl bg-linear-to-r ${gradient}`}
      />

      <p className="text-md text-(--des) font-bold relative z-10">{label}</p>

      <p
        className={`text-4xl font-extrabold bg-linear-to-r ${gradient} bg-clip-text text-transparent relative z-10`}
      >
        {value}
      </p>

      <p className="text-xs text-(--des) relative z-10">{unit}</p>
    </DashboardCard>
  );
}
export default StatCircle;
