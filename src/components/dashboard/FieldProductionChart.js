"use client";

import { useEffect, useState } from "react";

import Highcharts from "highcharts";

import HighchartsReact from "highcharts-react-official";

import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";

export default function FieldProductionChart({ data }) {
  const [loading, setLoading] = useState(true);

  const categories = data.map((item) => item.fieldName);
  const production = data.map((item) => item.production);
  const target = data.map((item) => item.target);

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: 400,
    },
    title: {
      text: undefined,
    },
    xAxis: {
      categories,
      title: {
        text: "Field",
        style: {
          color: "#ffffff",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          color: "#ffffff",
          fontSize: "14px",
        },
      },
      lineColor: "#ffffff",
      tickColor: "#ffffff",
    },
    yAxis: {
      title: {
        text: "Production (m³/d)",
        style: {
          color: "#ffffff",
          fontSize: "14px",
        },
      },
      labels: {
        style: {
          color: "#ffffff",
          fontSize: "14px",
        },
      },
      gridLineColor: "#3f3f46",
    },
    tooltip: {
      shared: true,
      backgroundColor: "#18181b",
      borderColor: "#3f3f46",
      style: {
        color: "#ffffff",
      },
      valueDecimals: 2,
      valueSuffix: " m³/d",
    },
    legend: {
      itemStyle: {
        color: "#a1a1aa",
        fontSize: "12px",
      },
      itemHoverStyle: {
        color: "#ffffff",
      },
    },
    plotOptions: {
      column: {
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Production",
        data: production,
      },
      {
        name: "Target",
        data: target,
      },
    ],
    credits: {
      enabled: false,
    },
  };

  useEffect(() => {
    setLoading(false);
  }, [data]);

  return (
    <Card className="mt-6 border">
      <CardContent className="p-4">
        <div className="relative w-full min-w-0">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Spinner className="size-10" />
            </div>
          )}

          <div className="mb-4 text-center">
            <h3 className="text-lg font-semibold sm:text-xl">
              Production vs Target
            </h3>

            <p className="text-md text-muted-foreground sm:text-lg">By Field</p>
          </div>

          <div className="h-[400px] w-full">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
