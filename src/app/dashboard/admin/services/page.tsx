import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Manage Services" };

export default function Page() {
  return (
    <>
      <PageHeader title="Manage Services" description="Review pending services, change status or remove inappropriate ones" />
      <ComingSoon endpoints={["GET /api/admin/services?status=&search=", "PATCH /api/admin/services/:id/status", "DELETE /api/admin/services/:id"]} />
    </>
  );
}
