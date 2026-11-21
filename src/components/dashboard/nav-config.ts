import type { Role } from "@/lib/roles";

export type NavItem = { href: string; label: string; icon: string };

/** Sidebar items per role. Icons are lucide names resolved in the sidebar. */
export const DASHBOARD_NAV: Record<Role, NavItem[]> = {
  vendor: [
    { href: "/dashboard/vendor", label: "Overview", icon: "LayoutDashboard" },
    { href: "/dashboard/vendor/services", label: "My Services", icon: "BriefcaseBusiness" },
    { href: "/dashboard/vendor/services/new", label: "Add Service", icon: "SquarePlus" },
    { href: "/dashboard/vendor/bookings", label: "Booking Requests", icon: "CalendarCheck" },
    { href: "/dashboard/vendor/subscription", label: "Subscription", icon: "Crown" },
    { href: "/dashboard/profile", label: "Profile Settings", icon: "Settings" },
  ],
  customer: [
    { href: "/dashboard/customer", label: "Overview", icon: "LayoutDashboard" },
    { href: "/dashboard/customer/bookings", label: "My Bookings", icon: "CalendarHeart" },
    { href: "/dashboard/profile", label: "Profile Settings", icon: "Settings" },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: "LayoutDashboard" },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: "Users" },
    { href: "/dashboard/admin/services", label: "Manage Services", icon: "ShieldCheck" },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: "Receipt" },
    { href: "/dashboard/profile", label: "Profile Settings", icon: "Settings" },
  ],
};
