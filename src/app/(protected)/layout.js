import ProtectedRoute from "@/components/ProtectedRoute";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function ProtectedLayout({ children }) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <Sidebar />

        <SidebarInset>
          <Navbar />

          <main className="min-w-0 flex-1 p-4 sm:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
