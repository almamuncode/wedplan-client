import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { requireUser } from "@/lib/session";
import type { Role } from "@/lib/roles";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser("/dashboard");
  const role = (user.role ?? "customer") as Role;

  return (
    <div className="flex min-h-dvh bg-muted/30">
      <Sidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar user={user} />
        <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
