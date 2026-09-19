"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedLayout({ children }) {
  const { currentUser } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navbar />

        <div className="flex">
          <Sidebar role={currentUser?.role} />

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
