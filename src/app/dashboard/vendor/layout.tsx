import { requireRole } from "@/lib/session";

// Server-side gate: non-vendors who type this URL are redirected to their own dashboard.
export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  await requireRole("vendor");
  return children;
}
