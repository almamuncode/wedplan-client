import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";
import { dashboardFor } from "@/lib/roles";

export default async function DashboardIndex() {
  const user = await requireUser("/dashboard");
  redirect(dashboardFor(user.role));
}
