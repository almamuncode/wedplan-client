import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Transactions" };

export default function Page() {
  return (
    <>
      <PageHeader title="Transactions" description="Read-only payment history (records are written only by Stripe webhooks)" />
      <ComingSoon endpoints={["GET /api/admin/transactions?status="]} />
    </>
  );
}
