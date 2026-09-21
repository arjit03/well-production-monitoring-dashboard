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
import { Card, CardContent } from "@/components/ui/card";

export default function FieldProductionTrend({ fields, trends }) {
  const [selectedField, setSelectedField] = useState(fields[0] ?? "");

  const data = trends[selectedField] ?? [];

  return (
    <>
      <div className="mb-4 mt-6 flex flex-row items-center gap-4">
        <p className="text-sm font-medium sm:text-base">Field</p>

        <Select value={selectedField} onValueChange={setSelectedField}>
          <SelectTrigger className="w-[120px] text-sm sm:text-base">
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
      <Card className="mt-6 min-w-0 border overflow-hidden">
        <CardContent className="p-4">
          <ProductionTrendChart data={data} />
        </CardContent>
      </Card>
    </>
  );
}
