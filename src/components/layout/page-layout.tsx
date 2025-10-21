import { Sidebar, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Header } from "@/components/layout/header";

export function PageLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset className="flex flex-1 flex-col !bg-background">
        <Header title={title} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </div>
  );
}
