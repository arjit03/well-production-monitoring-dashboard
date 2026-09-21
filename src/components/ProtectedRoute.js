"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

const routeRoles = {
  "/dashboard": ["admin", "analyst", "viewer"],
  "/wells": ["admin", "analyst", "viewer"],
  "/tasks": ["admin", "analyst"],
  "/users": ["admin"],
};

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const allowedRoles = routeRoles[pathname];

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
      router.replace("/dashboard");
    }
  }, [loading, currentUser, pathname, router]);

  if (loading || !currentUser) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Spinner className="size-6" />
      </main>
    );
  }

  const allowedRoles = routeRoles[pathname];

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Spinner className="size-6" />
      </main>
    );
  }

  return children;
}
