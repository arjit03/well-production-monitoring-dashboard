import StatCard from "@/components/StatCard";
import ProductionTrendChart from "@/components/ProductionTrendChart";
import {
  getDashboardMetrics,
  getProductionTrend,
  getFieldProduction,
} from "@/lib/production";
import FieldProductionChart from "@/components/FieldProductionChart";

function formatCycleTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
}

export default function DashboardPage() {
  const metrics = getDashboardMetrics();
  const trend = getProductionTrend();
  const fieldProduction = getFieldProduction();

  const stats = [
    {
      title: "Total Production",
      value: `${metrics.totalProduction.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })} m³/d`,
    },
    {
      title: "Production Target",
      value: `${metrics.totalTarget.toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })} m³/d`,
    },
    {
      title: "Total Wells",
      value: metrics.totalWells,
    },
    {
      title: "Avg Cycle Time",
      value: formatCycleTime(metrics.averageCycleTime),
    },
  ];

  return (
    <>
      <div className="mb-6">
        <h2 className=" text-xl sm:text-2xl font-bold">Dashboard</h2>

        <p className="text-sm text-muted-foreground sm:text-base">
          Monitor well production and performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <div className="mt-6 min-w-0 overflow-hidden rounded-lg border bg-card p-4">
        <ProductionTrendChart data={trend} />
      </div>
      <div className="mt-6 min-w-0 overflow-hidden rounded-lg border bg-card p-4">
        <FieldProductionChart data={fieldProduction} />
      </div>
    </>
  );
}
