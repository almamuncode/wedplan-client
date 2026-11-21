import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "My Services" };

export default function Page() {
  return (
    <>
      <PageHeader title="My Services" description="View, edit, hide or delete your services and see their approval status" />
      <ComingSoon endpoints={["GET /api/vendor/services", "PATCH /api/vendor/services/:id/availability", "DELETE /api/vendor/services/:id"]} />
    </>
  );
}
