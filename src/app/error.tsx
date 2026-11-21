"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid min-h-[60dvh] place-items-center px-4 text-center">
      <div>
        <h1 className="text-3xl">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">Please try again. If it keeps happening, refresh the page.</p>
        <Button className="mt-6" onClick={() => retry()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
