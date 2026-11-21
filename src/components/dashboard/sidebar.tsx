"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  CalendarCheck,
  CalendarHeart,
  Crown,
  LayoutDashboard,
  Menu,
  Receipt,
  Settings,
  ShieldCheck,
  SquarePlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/roles";
import { DASHBOARD_NAV } from "./nav-config";

const ICONS: Record<string, LucideIcon> = {
  BriefcaseBusiness,
  CalendarCheck,
  CalendarHeart,
  Crown,
  LayoutDashboard,
  Receipt,
  Settings,
  ShieldCheck,
  SquarePlus,
  Users,
};

function NavLinks({ role, onNavigate }: { role: Role; onNavigate?: boolean }) {
  const pathname = usePathname();
  const items = DASHBOARD_NAV[role];
  // The most specific matching href wins, so "Add Service" doesn't also light up "My Services".
  const active = items
    .filter((i) => pathname === i.href || pathname.startsWith(i.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

  return (
    <ul className="grid gap-1">
      {items.map((item) => {
        const Icon = ICONS[item.icon] ?? LayoutDashboard;
        const link = (
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active === item.href
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
        return <li key={item.href}>{onNavigate ? <SheetClose asChild>{link}</SheetClose> : link}</li>;
      })}
    </ul>
  );
}

export function Sidebar({ role }: { role: Role }) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r bg-sidebar p-4 lg:flex">
      <Logo className="mb-8 px-2" />
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{role} panel</p>
      <NavLinks role={role} />
    </aside>
  );
}

export function MobileSidebar({ role }: { role: Role }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open dashboard menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="bg-sidebar p-4">
        <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
        <Logo className="mb-8 px-2" />
        <NavLinks role={role} onNavigate />
      </SheetContent>
    </Sheet>
  );
}
