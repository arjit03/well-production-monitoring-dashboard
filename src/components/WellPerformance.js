import WellPerformanceCard from "@/components/WellPerformanceCard";

export default function WellPerformance({ data }) {
  const topWells = data.filter((well) => well.achievement !== null).slice(0, 5);

  const underperformingWells = data
    .filter((well) => well.achievement < 100)
    .slice(-5)
    .reverse();

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <WellPerformanceCard
        title="Top Performing Wells"
        wells={topWells}
        emptyMessage="No wells are currently available."
      />

      <WellPerformanceCard
        title="Underperforming Wells"
        wells={underperformingWells}
        emptyMessage="No wells are currently below their production target."
      />
    </div>
  );
}
