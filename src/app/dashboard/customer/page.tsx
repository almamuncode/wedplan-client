"use client";

import { CalendarHeart, CheckCircle2, Clock, XCircle } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ErrorState } from "@/components/common/error-state";
import { StatCard, StatGridSkeleton } from "@/components/dashboard/stat-card";
import { useApi } from "@/hooks/use-api";

type CustomerStats = { total: number; pending: number; accepted: number; rejected: number; cancelled: number };

export default function CustomerOverviewPage() {
  const { data, error, loading, reload } = useApi<CustomerStats>("/api/bookings/stats");

  return (
    <>
      <PageHeader title="My Wedding Plans" description="Track every booking request you have sent" />
      {loading ? (
        <StatGridSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : data ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Booking Requests" value={data.total} icon={CalendarHeart} />
          <StatCard label="Pending" value={data.pending} icon={Clock} tone="gold" />
          <StatCard label="Accepted" value={data.accepted} icon={CheckCircle2} tone="green" />
          <StatCard label="Rejected" value={data.rejected} icon={XCircle} tone="slate" />
        </div>
      ) : null}
    </>
  );
}
