import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Add Service" };

export default function Page() {
  return (
    <>
      <PageHeader title="Add Service" description="New services stay pending until an admin approves them" />
      <ComingSoon endpoints={["POST /api/uploads/image", "POST /api/vendor/services"]} />
    </>
  );
}
