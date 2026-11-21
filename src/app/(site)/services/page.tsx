import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Browse Services" };

// Public page. Search, category/location filters, price sorting, loading and
// empty states go here. "View Details" links to /services/[id], which the
// proxy sends to Sign In for guests.
export default function BrowseServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <PageHeader title="Browse Wedding Services" description="Find photographers, venues, florists and more" />
      <ComingSoon endpoints={["GET /api/services?search=&category=&location=&sort=price_asc|price_desc&page="]} />
    </div>
  );
}
