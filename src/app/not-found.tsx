import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-4 text-center">
      <div>
        <p className="font-serif text-7xl text-primary">404</p>
        <h1 className="mt-2 text-3xl">This page wandered off</h1>
        <p className="mt-2 text-muted-foreground">The page you are looking for does not exist or was moved.</p>
        <Button asChild className="mt-6">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
