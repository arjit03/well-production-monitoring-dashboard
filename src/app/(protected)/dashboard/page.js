"use client";

import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/context/AuthContext";

const stats = [
  { title: "Total Production", value: "—" },
  { title: "Production Target", value: "—" },
  { title: "Total Wells", value: "—" },
  { title: "Avg Cycle Time", value: "—" },
];

export default function DashboardPage() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-xl font-semibold">Well Production Monitor</h1>
      </header>

      <div className="flex">
        <Sidebar role={currentUser.role} />

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">
              Monitor well production and performance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
