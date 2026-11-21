import { requireRole } from "@/lib/session";

// Server-side gate: non-admins who type this URL are redirected to their own dashboard.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole("admin");
  return children;
}
