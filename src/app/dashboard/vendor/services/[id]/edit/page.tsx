import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Edit Service" };

export default function Page() {
  return (
    <>
      <PageHeader title="Edit Service" description="Edited services go back to admin review" />
      <ComingSoon endpoints={["GET /api/vendor/services/:id", "PATCH /api/vendor/services/:id"]} />
    </>
  );
}
