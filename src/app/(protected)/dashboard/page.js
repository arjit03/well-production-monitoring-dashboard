import StatCard from "@/components/StatCard";
import WellPerformance from "@/components/WellPerformance";
import FieldProductionTrend from "@/components/FieldProductionTrend";
import FieldProductionChart from "@/components/FieldProductionChart";

import {
  getDashboardMetrics,
  getFieldProduction,
  getFieldProductionTrend,
  getWellPerformance,
  parseRows,
} from "@/lib/production";

function formatCycleTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
}

export default function DashboardPage() {
  const rows = parseRows();

  const metrics = getDashboardMetrics(rows);
  const fieldProduction = getFieldProduction(rows);
  const wellPerformance = getWellPerformance(rows);

  const fields = [...new Set(rows.map((row) => row.fieldName))].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

  const fieldTrends = Object.fromEntries(
    fields.map((field) => [field, getFieldProductionTrend(field, rows)]),
  );

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
        <h2 className="text-xl font-bold sm:text-2xl">Dashboard</h2>

        <p className="text-sm text-muted-foreground sm:text-base">
          Monitor well production and performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <FieldProductionTrend fields={fields} trends={fieldTrends} />

      <div className="mt-6 min-w-0 overflow-hidden rounded-lg border bg-card p-4">
        <FieldProductionChart data={fieldProduction} />
      </div>

      <div className="mt-6 mb-2">
        <WellPerformance data={wellPerformance} />
      </div>
    </>
  );
}
