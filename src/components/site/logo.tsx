import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2", className)} aria-label="WedPlan home">
      <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="9" cy="13" r="5" />
          <circle cx="15" cy="13" r="5" />
          <path d="M10 4l2 2 2-2" />
        </svg>
      </span>
      <span className="font-serif text-xl font-semibold tracking-tight">
        Wed<span className="text-primary">Plan</span>
      </span>
    </Link>
  );
}
