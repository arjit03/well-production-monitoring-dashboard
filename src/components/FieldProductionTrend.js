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

export default function FieldProductionTrend({ fields, trends }) {
  const [selectedField, setSelectedField] = useState(fields[0] ?? "");

  const data = trends[selectedField] ?? [];

  return (
    <div className="mt-6 min-w-0 overflow-hidden rounded-lg border bg-card p-4">
      <div className="mb-4 flex items-center justify-start gap-4">
        <p className="text-sm font-medium sm:text-base">Field</p>

        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Select field" />
          </SelectTrigger>

          <SelectContent>
            {fields.map((field) => (
              <SelectItem key={field} value={field}>
                {field}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ProductionTrendChart data={data} title="Field Production Trend" />
    </div>
  );
}
