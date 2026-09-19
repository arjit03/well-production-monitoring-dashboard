import StatCard from "@/components/StatCard";

const stats = [
  { title: "Total Production", value: "—" },
  { title: "Production Target", value: "—" },
  { title: "Total Wells", value: "—" },
  { title: "Avg Cycle Time", value: "—" },
];

export default function DashboardPage() {
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
