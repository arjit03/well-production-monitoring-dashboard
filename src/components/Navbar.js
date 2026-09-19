"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { currentUser, setCurrentUser } = useAuth();
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.replace("/login");
  }

  return (
    <header className="border-b border-border px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Well Production Monitor</h1>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">{currentUser?.name}</p>
            <p className="text-xs capitalize text-muted-foreground">
              {currentUser?.role}
            </p>
          </div>

          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
