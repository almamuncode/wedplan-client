import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "My Bookings" };

export default function Page() {
  return (
    <>
      <PageHeader title="My Bookings" description="Every booking request you have sent, with its status" />
      <ComingSoon endpoints={["GET /api/bookings?status=", "GET /api/bookings/:id", "PATCH /api/bookings/:id/cancel"]} />
    </>
  );
}
