import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WellPerformanceCard({ title, wells, emptyMessage }) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        {wells.length > 0 ? (
          <div className="flex flex-col gap-3">
            {wells.map((well) => (
              <div
                key={well.wellName}
                className="flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium sm:text-base">
                    Well: {well.wellName}
                  </p>

                  <p className="text-xs text-muted-foreground sm:text-sm">
                    Field: {well.fieldName}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-semibold sm:text-base">
                  {well.achievement.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[200px] items-center">
            <p className="w-full text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
