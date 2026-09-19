"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.replace("/login");
    }
  }, [loading, currentUser, router]);

  if (loading || !currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Spinner className="size-6" />
      </main>
    );
  }

  return children;
}
