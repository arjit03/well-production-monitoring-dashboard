import StatCard from "@/components/StatCard";
import { getDashboardMetrics } from "@/lib/production";

export default function DashboardPage() {
  const metrics = getDashboardMetrics();

  const stats = [
    {
      title: "Total Production",
      value: metrics.totalProduction.toFixed(2),
    },
    {
      title: "Production Target",
      value: metrics.totalTarget.toFixed(2),
    },
    {
      title: "Total Wells",
      value: metrics.totalWells,
    },
    {
      title: "Avg Cycle Time",
      value: `${metrics.averageCycleTime.toFixed(2)} sec`,
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>

        <p className="text-muted-foreground">
          Monitor well production and performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </>
  );
}
