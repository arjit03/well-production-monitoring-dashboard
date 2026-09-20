import { getWellProductionTrend, parseRows } from "@/lib/production";
import WellProductionTrend from "@/components/WellProductionTrend";

export default function WellsPage() {
  const rows = parseRows();

  const wells = [...new Set(rows.map((row) => row.wellName))].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

  const wellTrends = Object.fromEntries(
    wells.map((well) => [well, getWellProductionTrend(well, rows)]),
  );

  return (
    <>
      <div className="mb-6">
        <h2 className="text-xl font-bold sm:text-2xl">Wells</h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          Monitor individual well production and performance.
        </p>
      </div>

      <WellProductionTrend wells={wells} trends={wellTrends} />
    </>
  );
}
