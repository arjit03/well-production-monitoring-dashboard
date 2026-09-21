import StatCard from "@/components/StatCard";
import WellPerformance from "@/components/WellPerformance";
import FieldProductionTrend from "@/components/FieldProductionTrend";
import FieldProductionChart from "@/components/FieldProductionChart";
import PageHeader from "@/components/PageHeader";

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
      <PageHeader
        title="Dashboard"
        description="Overview of well production and performance."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>

      <FieldProductionTrend fields={fields} trends={fieldTrends} />

      <FieldProductionChart data={fieldProduction} />

      <div className="mt-6 mb-2">
        <WellPerformance data={wellPerformance} />
      </div>
    </>
  );
}
