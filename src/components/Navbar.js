import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-border px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <Link
          href="/dashboard"
          className="text-lg font-semibold sm:text-xl hover:opacity-80 transition-opacity"
        >
          Well Production Monitor
        </Link>
      </div>
    </header>
  );
}
