import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = { label: string; value: React.ReactNode; icon: LucideIcon; hint?: string; tone?: "rose" | "gold" | "green" | "slate" };

const TONES = {
  rose: "bg-secondary text-primary",
  gold: "bg-accent text-accent-foreground",
  green: "bg-emerald-50 text-emerald-700",
  slate: "bg-muted text-foreground",
};

export function StatCard({ label, value, icon: Icon, hint, tone = "rose" }: Props) {
  return (
    <Card className="gap-0 py-5">
      <CardContent className="flex items-center gap-4">
        <span className={cn("grid size-12 shrink-0 place-items-center rounded-xl", TONES[tone])}>
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm text-muted-foreground">{label}</p>
          <p className="font-serif text-2xl font-semibold">{value}</p>
          {hint && <p className="truncate text-xs text-muted-foreground">{hint}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-[92px] rounded-xl" />
      ))}
    </div>
  );
}
