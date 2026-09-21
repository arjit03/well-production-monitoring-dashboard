"use client";
import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ModuleRegistry.registerModules([AllCommunityModule]);

const baseTheme = {
  backgroundColor: "#171717",
  foregroundColor: "#ffffff",
  borderColor: "#3f3f46",
  rowHoverColor: "#262626",
};

const desktopTheme = themeQuartz.withParams({
  ...baseTheme,
  fontSize: 13,
  headerFontSize: 15,
  cellFontSize: 14,
});

const mobileTheme = themeQuartz.withParams({
  ...baseTheme,
  fontSize: 12,
  headerFontSize: 14,
  cellFontSize: 13,
});

export default function WellsGrid({ data }) {
  const [isMobile, setIsMobile] = useState(false);
  const columnDefs = [
    {
      field: "wellName",
      headerName: "Well Name",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "fieldName",
      headerName: "Field Name",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "production1D",
      headerName: "Production (1D)",
      minWidth: 150,
      valueFormatter: (params) =>
        params.value !== null
          ? `${params.value.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })} m³/d`
          : "—",
    },
    {
      field: "production7D",
      headerName: "Production (7D)",
      minWidth: 150,
      valueFormatter: (params) =>
        params.value !== null
          ? `${params.value.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })} m³/d`
          : "—",
    },
    {
      field: "productionTarget",
      headerName: "Target",
      minWidth: 130,
      valueFormatter: (params) =>
        params.value > 0
          ? `${params.value.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })} m³/d`
          : "—",
    },
    {
      field: "averageCycleTimeMinutes",
      headerName: "Cycle Time",
      minWidth: 120,
      filter: "agNumberColumnFilter",
      valueFormatter: (params) =>
        params.value !== null ? `${Math.round(params.value)} min` : "—",
    },
    {
      field: "achievement",
      headerName: "Achievement",
      minWidth: 120,
      valueFormatter: (params) =>
        params.value !== null ? `${params.value.toFixed(1)}%` : "—",
      resizable: false,
    },
  ];

  return (
    <Card className="mt-6 min-w-0 border pb-0 overflow-hidden">
      <CardHeader className="p-4 pb-3 text-center">
        <CardTitle className="text-lg sm:text-xl">
          Well Production Data
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="h-[350px] min-w-0 w-full sm:h-[500px]">
          <AgGridReact
            theme={isMobile ? mobileTheme : desktopTheme}
            rowData={data}
            columnDefs={columnDefs}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
            }}
            pagination
            paginationPageSize={9}
            paginationPageSizeSelector={false}
            paginationPanels={
              isMobile
                ? [
                    {
                      type: "pageSummary",
                      suppressPageInput: true,
                    },
                  ]
                : [
                    "rowSummary",
                    {
                      type: "pageSummary",
                      suppressPageInput: true,
                    },
                  ]
            }
            onGridSizeChanged={(params) => {
              setIsMobile(params.clientWidth < 400);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
