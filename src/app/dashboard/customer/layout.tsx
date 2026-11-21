import { requireRole } from "@/lib/session";

// Server-side gate: non-customers who type this URL are redirected to their own dashboard.
export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  await requireRole("customer");
  return children;
}
