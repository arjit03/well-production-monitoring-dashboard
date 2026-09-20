import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
  return (
    <header className="border-b border-border px-4 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <h1 className="text-lg font-semibold sm:text-xl">
          Well Production Monitor
        </h1>
      </div>
    </header>
  );
}
