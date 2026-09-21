import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({ title, value = "—" }) {
  return (
    <Card className="border">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-lg font-bold whitespace-nowrap sm:text-xl">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
