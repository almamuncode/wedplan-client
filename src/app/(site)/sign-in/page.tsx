import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth/auth-card";
import { SignInForm } from "@/components/auth/sign-in-form";
import { getSession } from "@/lib/session";
import { dashboardFor } from "@/lib/roles";

export const metadata: Metadata = { title: "Sign In" };

export default async function SignInPage() {
  const session = await getSession();
  if (session) redirect(dashboardFor(session.user.role));

  return (
    <AuthCard title="Welcome back" description="Sign in to manage your bookings and services">
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthCard>
  );
}
