import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { getSession } from "@/lib/session";
import { dashboardFor } from "@/lib/roles";

export const metadata: Metadata = { title: "Sign Up" };

export default async function SignUpPage() {
  const session = await getSession();
  if (session) redirect(dashboardFor(session.user.role));

  return (
    <AuthCard title="Create your account" description="Join as a couple planning a wedding or as a vendor">
      <SignUpForm />
    </AuthCard>
  );
}
