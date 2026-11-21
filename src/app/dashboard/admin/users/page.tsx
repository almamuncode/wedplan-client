import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Manage Users" };

export default function Page() {
  return (
    <>
      <PageHeader title="Manage Users" description="Search, filter, view and block or unblock accounts" />
      <ComingSoon endpoints={["GET /api/admin/users?search=&role=&status=", "GET /api/admin/users/:id", "PATCH /api/admin/users/:id/block"]} />
    </>
  );
}
