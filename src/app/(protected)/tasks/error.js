"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
      <h2 className="text-xl font-bold sm:text-2xl">Something went wrong</h2>

      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        An unexpected error occurred. Please try again.
      </p>

      <Button onClick={() => reset()} className="mt-4">
        Try again
      </Button>
    </div>
  );
}
