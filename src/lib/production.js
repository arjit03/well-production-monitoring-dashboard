import fs from "fs";
import path from "path";
import Papa from "papaparse";

const csvPath = path.join(
  process.cwd(),
  "src",
  "data",
  "frontend_sample_data.csv",
);

// Convert CSV values to numbers.
// Missing or invalid values become null.
function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

// Read and format the CSV data.
export function parseRows() {
  const csv = fs.readFileSync(csvPath, "utf8");

  const { data } = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return data.map((row) => ({
    wellName: row["Well Name"],
    fieldName: row["Field Name"],
    timestamp: row["Timestamp"],
    production1D: toNumber(row["Production_1D"]),
    production7D: toNumber(row["Production_7D"]),
    productionTarget: toNumber(row["Production Target"]),
    averageCycleTime: toNumber(row["Average Cycle Time"]),
  }));
}

// Get all production records.
export function getProductionData() {
  return parseRows();
}

// Get the latest date in the dataset.
function getLatestDate(rows) {
  return rows.reduce((latest, row) => {
    if (!latest || new Date(row.timestamp) > new Date(latest)) {
      return row.timestamp;
    }

    return latest;
  }, null);
}

// Get the main dashboard numbers.
export function getDashboardMetrics(rows = parseRows()) {
  const latestDate = getLatestDate(rows);

  // Only use records from the latest available date.
  const latestRows = rows.filter((row) => row.timestamp === latestDate);

  const validProduction = latestRows.filter((row) => row.production1D !== null);

  // Only positive targets are considered valid.
  const validTargets = latestRows.filter((row) => row.productionTarget > 0);

  const validCycleTimes = latestRows.filter(
    (row) => row.averageCycleTime !== null,
  );

  return {
    totalProduction: validProduction.reduce(
      (sum, row) => sum + row.production1D,
      0,
    ),

    totalTarget: validTargets.reduce(
      (sum, row) => sum + row.productionTarget,
      0,
    ),

    // Count unique well names.
    totalWells: new Set(latestRows.map((row) => row.wellName)).size,

    averageCycleTime:
      validCycleTimes.length > 0
        ? validCycleTimes.reduce((sum, row) => sum + row.averageCycleTime, 0) /
          validCycleTimes.length
        : 0,
  };
}

// Get production and target totals for each date.
export function getProductionTrend(rows = parseRows()) {
  const byDate = {};

  for (const row of rows) {
    if (!byDate[row.timestamp]) {
      byDate[row.timestamp] = {
        timestamp: row.timestamp,
        production: 0,
        target: 0,
      };
    }

    const date = byDate[row.timestamp];

    if (row.production1D !== null) {
      date.production += row.production1D;
    }

    // Ignore missing, zero and negative targets.
    if (row.productionTarget > 0) {
      date.target += row.productionTarget;
    }
  }

  return Object.values(byDate).sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
  );
}

// Only use records from the latest available date.
export function getFieldProduction(rows = parseRows()) {
  const latestDate = getLatestDate(rows);

  // Only use records from the latest available date.
  const latestRows = rows.filter((row) => row.timestamp === latestDate);

  const byField = {};

  for (const row of latestRows) {
    if (!byField[row.fieldName]) {
      byField[row.fieldName] = {
        fieldName: row.fieldName,
        production: 0,
        target: 0,
      };
    }

    const field = byField[row.fieldName];

    if (row.production1D !== null) {
      field.production += row.production1D;
    }

    // Ignore missing, zero and negative targets.
    if (row.productionTarget > 0) {
      field.target += row.productionTarget;
    }
  }

  return Object.values(byField).sort((a, b) => b.production - a.production);
}

// Calculate latest-date production performance for every well.
export function getWellPerformance(rows = parseRows()) {
  const latestDate = getLatestDate(rows);

  // Only use records from the latest available date.
  const latestRows = rows.filter((row) => row.timestamp === latestDate);

  const byWell = {};

  for (const row of latestRows) {
    if (!byWell[row.wellName]) {
      byWell[row.wellName] = {
        wellName: row.wellName,
        fieldName: row.fieldName,
        production: 0,
        target: 0,
      };
    }

    const well = byWell[row.wellName];

    if (row.production1D !== null) {
      well.production += row.production1D;
    }

    // Only positive targets are used.
    if (row.productionTarget > 0) {
      well.target += row.productionTarget;
    }
  }

  return Object.values(byWell)
    .map((well) => ({
      ...well,
      achievement:
        well.target > 0 ? (well.production / well.target) * 100 : null,
    }))
    .filter((well) => well.achievement !== null)
    .sort((a, b) => b.achievement - a.achievement);
}
// Get production and target trends over time for a specific field.
export function getFieldProductionTrend(fieldName, rows = parseRows()) {
  const byDate = {};

  for (const row of rows) {
    if (row.fieldName !== fieldName) {
      continue;
    }

    if (!byDate[row.timestamp]) {
      byDate[row.timestamp] = {
        timestamp: row.timestamp,
        production: 0,
        target: 0,
      };
    }

    if (row.production1D !== null) {
      byDate[row.timestamp].production += row.production1D;
    }

    // Only positive targets are used.
    if (row.productionTarget > 0) {
      byDate[row.timestamp].target += row.productionTarget;
    }
  }

  return Object.values(byDate).sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
  );
}
