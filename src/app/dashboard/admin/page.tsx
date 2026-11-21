"use client";

import { BriefcaseBusiness, Clock, Receipt, Store, UserRound, Users } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { ErrorState } from "@/components/common/error-state";
import { StatCard, StatGridSkeleton } from "@/components/dashboard/stat-card";
import { useApi } from "@/hooks/use-api";
import { formatPrice } from "@/lib/utils";

type AdminStats = {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalTransactions: number;
  totalRevenue: number;
};

export default function AdminOverviewPage() {
  const { data, error, loading, reload } = useApi<AdminStats>("/api/admin/stats");

  return (
    <>
      <PageHeader title="Admin Overview" description="Platform health across users, services and payments" />
      {loading ? (
        <StatGridSkeleton count={6} />
      ) : error ? (
        <ErrorState message={error} onRetry={reload} />
      ) : data ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard label="Total Registered Users" value={data.totalUsers} icon={Users} />
          <StatCard label="Total Vendors" value={data.totalVendors} icon={Store} tone="gold" />
          <StatCard label="Total Customers" value={data.totalCustomers} icon={UserRound} tone="slate" />
          <StatCard label="Total Services" value={data.totalServices} icon={BriefcaseBusiness} tone="green" />
          <StatCard label="Pending Services" value={data.pendingServices} icon={Clock} tone="gold" />
          <StatCard
            label="Total Transactions"
            value={data.totalTransactions}
            icon={Receipt}
            hint={`${formatPrice(data.totalRevenue)} collected`}
          />
        </div>
      ) : null}
    </>
  );
}
