import type { Metadata } from "next";
import { PageHeader } from "@/components/common/page-header";
import { ComingSoon } from "@/components/common/coming-soon";

export const metadata: Metadata = { title: "Profile Settings" };

export default function Page() {
  return (
    <>
      <PageHeader title="Profile Settings" description="Update your name, photo and contact details" />
      <ComingSoon endpoints={["GET /api/users/me", "POST /api/uploads/image", "PATCH /api/users/me"]} />
    </>
  );
}
