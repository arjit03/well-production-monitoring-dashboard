"use client";

import { useEffect, useRef, useState } from "react";

import * as echarts from "echarts";

import { Spinner } from "@/components/ui/spinner";

export default function ProductionTrendChart({ data }) {
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chart = echarts.init(chartRef.current);

    const dates = data.map((item) => item.timestamp);
    const production = data.map((item) => item.production);
    const target = data.map((item) => item.target);

    const option = {
      tooltip: {
        trigger: "axis",
        confine: true,
        formatter: function (params) {
          const date = new Date(params[0].axisValue).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            },
          );

          const values = params
            .map(
              (item) =>
                `${item.marker} ${item.seriesName} ${Number(
                  item.value,
                ).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                })}`,
            )
            .join("<br/>");

          return `${date}<br/>${values}`;
        },
      },

      legend: {
        data: ["Production", "Target"],
        bottom: 0,
        textStyle: {
          color: "#a1a1aa",
          fontSize: 12,
        },
      },

      grid: {
        left: 60,
        right: 60,
        top: 20,
        bottom: 100,
      },

      xAxis: {
        type: "category",
        data: dates,
        name: "Date",
        nameLocation: "middle",
        nameGap: 45,
        nameTextStyle: {
          color: "#ffffff",
          fontSize: 14,
        },
        axisLabel: {
          color: "#ffffff",
          fontSize: 14,
          margin: 12,
          formatter: function (value) {
            return new Date(value).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            });
          },
        },
        axisLine: {
          lineStyle: {
            color: "#ffffff",
          },
        },
      },

      yAxis: {
        type: "value",
        name: "Production (m³/d)",
        nameGap: 35,
        nameTextStyle: {
          color: "#ffffff",
          fontSize: 14,
        },
        axisLabel: {
          color: "#ffffff",
          fontSize: 14,
          margin: 12,
        },
        axisLine: {
          lineStyle: {
            color: "#ffffff",
          },
        },
      },

      series: [
        {
          name: "Production",
          type: "line",
          data: production,
        },
        {
          name: "Target",
          type: "line",
          data: target,
        },
      ],
    };

    const mobileOptions = {
      grid: {
        left: 45,
        right: 10,
        top: 15,
        bottom: 85,
      },
      xAxis: {
        nameGap: 30,
        nameTextStyle: {
          fontSize: 14,
        },
        axisLabel: {
          fontSize: 12,
          margin: 8,
        },
      },
      yAxis: {
        nameGap: 25,
        nameTextStyle: {
          fontSize: 14,
        },
        axisLabel: {
          fontSize: 12,
          margin: 8,
        },
      },
      legend: {
        textStyle: {
          fontSize: 11,
        },
      },
    };

    const desktopOptions = {
      grid: {
        left: 60,
        right: 60,
        top: 20,
        bottom: 100,
      },
      xAxis: {
        nameGap: 45,
        nameTextStyle: {
          fontSize: 14,
        },
        axisLabel: {
          fontSize: 14,
          margin: 12,
        },
      },
      yAxis: {
        nameGap: 35,
        nameTextStyle: {
          fontSize: 14,
        },
        axisLabel: {
          fontSize: 14,
          margin: 12,
        },
      },
      legend: {
        textStyle: {
          fontSize: 12,
        },
      },
    };

    chart.setOption(option);
    setLoading(false);

    const resizeObserver = new ResizeObserver(() => {
      const width = chartRef.current.clientWidth;

      if (width < 768) {
        chart.setOption(mobileOptions);
      } else {
        chart.setOption(desktopOptions);
      }

      chart.resize();
    });

    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="mb-4 w-full min-w-0">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold sm:text-xl">
          Production vs Target
        </h3>
        <p className="text-md text-muted-foreground sm:text-lg">Over Time</p>
      </div>

      <div className="relative h-[400px] w-full">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="size-10" />
          </div>
        )}

        <div ref={chartRef} className="h-full w-full" />
      </div>
    </div>
  );
}
