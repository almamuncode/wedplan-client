import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/site/user-menu";
import type { Role } from "@/lib/roles";
import { MobileSidebar } from "./sidebar";

type Props = { user: { name: string; email: string; image?: string | null; role?: string | null } };

export function Topbar({ user }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/85 px-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-2">
        <MobileSidebar role={(user.role ?? "customer") as Role} />
        <p className="text-sm text-muted-foreground">
          Hello, <span className="font-medium text-foreground">{user.name.split(" ")[0]}</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
          <Link href="/services">Browse Services</Link>
        </Button>
        <UserMenu user={user} />
      </div>
    </header>
  );
}
