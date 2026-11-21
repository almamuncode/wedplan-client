import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Subscription" };

export default function Page() {
  return (
    <>
      <PageHeader title="Subscription" description="Free: 3 active services · Premium: unlimited services and a Premium Vendor badge" />
      <ComingSoon endpoints={["GET /api/vendor/stats", "POST /api/payments/checkout-session", "POST /api/payments/cancel-subscription"]} />
    </>
  );
}
