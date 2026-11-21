import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Booking Requests" };

export default function Page() {
  return (
    <>
      <PageHeader title="Booking Requests" description="Accept or reject requests for your services" />
      <ComingSoon endpoints={["GET /api/vendor/bookings?status=", "PATCH /api/vendor/bookings/:id { status }"]} />
    </>
  );
}
