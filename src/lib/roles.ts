export type Role = "admin" | "vendor" | "customer";

export const DASHBOARD_HOME: Record<Role, string> = {
  admin: "/dashboard/admin",
  vendor: "/dashboard/vendor",
  customer: "/dashboard/customer",
};

export function dashboardFor(role: string | null | undefined) {
  return DASHBOARD_HOME[(role as Role) ?? "customer"] ?? DASHBOARD_HOME.customer;
}
