"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth-client";
import { dashboardFor } from "@/lib/roles";
import { FieldError, OrDivider } from "./auth-card";
import { GoogleButton } from "./google-button";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
type Values = z.infer<typeof schema>;

/** Only allow same-site relative redirects (prevents open redirects). */
function safeCallback(url: string | null) {
  return url && url.startsWith("/") && !url.startsWith("//") ? url : null;
}

export function SignInForm() {
  const router = useRouter();
  const callbackUrl = safeCallback(useSearchParams().get("callbackUrl"));
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    const { data, error } = await signIn.email(values);
    if (error) {
      toast.error(error.message ?? "Invalid email or password");
      return;
    }
    toast.success(`Welcome back, ${data.user.name.split(" ")[0]}!`);
    router.push(callbackUrl ?? dashboardFor(data.user.role));
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="current-password" aria-invalid={!!errors.password} {...register("password")} />
          <FieldError message={errors.password?.message} />
        </div>
        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting && <Loader2 className="animate-spin" />} Sign In
        </Button>
      </form>
      <OrDivider />
      <GoogleButton callbackURL={callbackUrl ?? "/dashboard"} />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New to WedPlan?{" "}
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}
