export const dynamic = "force-dynamic";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";
import { AppHeader } from "@/components/layout/header";
import { FooterBar } from "@/components/layout/footer-bar";
import { UserSync } from "@/components/providers/user-sync";
import { ScanLinker } from "@/components/providers/scan-linker";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserSync>
      <ScanLinker>
        <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <FooterBar />
        </SidebarInset>
        </SidebarProvider>
      </ScanLinker>
    </UserSync>
  );
}
