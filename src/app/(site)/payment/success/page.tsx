import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Payment Successful" };

// Shows confirmation only. Premium is switched on by the Stripe webhook on the
// server; poll the session status until it reports "paid".
export default function PaymentSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader title="Payment received" description="We are confirming your Premium upgrade with Stripe" />
      <ComingSoon endpoints={["GET /api/payments/session/:sessionId"]} />
    </div>
  );
}
