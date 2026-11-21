"use client";

import Link from "next/link";
import { BriefcaseBusiness, CalendarCheck, CheckCircle2, Clock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/page-header";
import { ErrorState } from "@/components/common/error-state";
import { StatCard, StatGridSkeleton } from "@/components/dashboard/stat-card";
import { useApi } from "@/hooks/use-api";
import { formatDate } from "@/lib/utils";

type VendorStats = {
  totalServices: number;
  activeServices: number;
  pendingServices: number;
  pendingBookings: number;
  acceptedBookings: number;
  subscription: { plan: "free" | "premium"; expiresAt: string | null; serviceLimit: number | null; usedSlots: number };
};

export default function VendorOverviewPage() {
  const { data, error, loading, reload } = useApi<VendorStats>("/api/vendor/stats");

  return (
    <>
      <PageHeader
        title="Vendor Overview"
        description="Your services, requests and plan at a glance"
        action={
          <Button asChild>
            <Link href="/dashboard/vendor/services/new">Add Service</Link>
          </Button>
        }
      />
      {loading ? (
        <StatGridSkeleton count={5} />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : data ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Total Services" value={data.totalServices} icon={BriefcaseBusiness} hint={`${data.pendingServices} awaiting review`} />
          <StatCard label="Active Services" value={data.activeServices} icon={CheckCircle2} tone="green" />
          <StatCard label="Pending Booking Requests" value={data.pendingBookings} icon={Clock} tone="gold" />
          <StatCard label="Accepted Bookings" value={data.acceptedBookings} icon={CalendarCheck} tone="slate" />
          <StatCard
            label="Current Plan"
            value={<span className="capitalize">{data.subscription.plan}</span>}
            icon={Crown}
            tone="gold"
            hint={
              data.subscription.plan === "premium" && data.subscription.expiresAt
                ? `Renews ${formatDate(data.subscription.expiresAt)}`
                : `${data.subscription.usedSlots} of ${data.subscription.serviceLimit} active slots used`
            }
          />
        </div>
      ) : null}
    </>
  );
}
