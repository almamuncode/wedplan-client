import Link from "next/link";
import { ShieldBan } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlockedPage() {
  return (
    <div className="grid min-h-dvh place-items-center px-4">
      <div className="max-w-md text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-destructive/10 text-destructive">
          <ShieldBan className="size-6" />
        </span>
        <h1 className="mt-4 text-3xl">Account blocked</h1>
        <p className="mt-2 text-muted-foreground">
          Your account has been blocked by an administrator, so dashboards and bookings are unavailable.
          Contact hello@wedplan.com if you think this is a mistake.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
