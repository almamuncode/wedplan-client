import { StatGridSkeleton } from "@/components/dashboard/stat-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-9 w-64" />
      <StatGridSkeleton />
      <Skeleton className="h-64 rounded-xl" />
    </div>
  );
}
