import type { Metadata } from "next";
import Link from "next/link";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Payment Cancelled" };

export default function PaymentCancelPage() {
  return (
    <div className="container mx-auto grid place-items-center px-4 py-24 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-muted text-muted-foreground">
        <CircleX className="size-6" />
      </span>
      <h1 className="mt-4 text-3xl">Payment cancelled</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        No charge was made and your plan has not changed. You can upgrade any time from your dashboard.
      </p>
      <div className="mt-6 flex gap-3">
        <Button asChild>
          <Link href="/dashboard/vendor/subscription">Back to Subscription</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
