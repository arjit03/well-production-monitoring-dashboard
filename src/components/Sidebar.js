"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { navItems } from "@/config/navigation";

import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAuth();

  const visibleItems = navItems.filter((item) =>
    item.roles.includes(currentUser?.role),
  );

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.replace("/login");
  }

  return (
    <SidebarPrimitive>
      <SidebarHeader>
        <div className="px-2 py-2">
          <p className="font-semibold text-base sm:text-lg">
            Production Monitor
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className="text-sm sm:text-base"
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex w-full items-center justify-between gap-2 px-2 py-2">
          <p className="truncate text-sm font-medium">{currentUser?.name}</p>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="shrink-0"
          >
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </SidebarPrimitive>
  );
}
