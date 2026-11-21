import type { Metadata } from "next";
import { requireUser } from "@/lib/session";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Service Details" };

// Private page: the proxy redirects guests, and this check covers direct renders.
// Only customers see the booking form; vendors (own service) and admins get a notice.
export default async function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireUser(`/services/${id}`);

  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader title="Service Details" description={`Service ${id}`} />
      <ComingSoon endpoints={["GET /api/services/:id", "POST /api/bookings"]} />
    </div>
  );
}
