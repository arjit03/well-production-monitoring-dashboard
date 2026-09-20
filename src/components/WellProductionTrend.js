"use client";

import { useState } from "react";

import ProductionTrendChart from "@/components/ProductionTrendChart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WellProductionTrend({ wells, trends }) {
  const [selectedWell, setSelectedWell] = useState(wells[0] ?? "");

  const data = trends[selectedWell] ?? [];

  return (
    <div className="min-w-0 overflow-hidden rounded-lg border bg-card p-4">
      <div className="mb-4 flex items-center justify-start gap-4">
        <p className="text-sm font-medium sm:text-base">Well</p>

        <Select value={selectedWell} onValueChange={setSelectedWell}>
          <SelectTrigger className="w-[140px] text-sm sm:text-base">
            <SelectValue placeholder="Select well" />
          </SelectTrigger>

          <SelectContent>
            {wells.map((well) => (
              <SelectItem key={well} value={well}>
                {well}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ProductionTrendChart data={data} />
    </div>
  );
}
