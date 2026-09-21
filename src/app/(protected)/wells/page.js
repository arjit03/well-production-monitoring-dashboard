import {
  getWellProductionTrend,
  getWellTableData,
  parseRows,
} from "@/lib/production";

import WellProductionTrend from "@/components/WellProductionTrend";
import WellsGrid from "@/components/WellsGrid";
import PageHeader from "@/components/PageHeader";

export default function WellsPage() {
  const rows = parseRows();

  const wells = [...new Set(rows.map((row) => row.wellName))].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

  const wellTrends = Object.fromEntries(
    wells.map((well) => [well, getWellProductionTrend(well, rows)]),
  );

  const wellTableData = getWellTableData(rows);

  return (
    <>
      <PageHeader
        title="Wells"
        description="Monitor individual well production and performance."
      />

      <WellProductionTrend wells={wells} trends={wellTrends} />

      <WellsGrid data={wellTableData} />
    </>
  );
}
