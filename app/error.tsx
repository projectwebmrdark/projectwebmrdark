"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">500</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-8">
          {error.message || "An unexpected error occurred."}
        </p>
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </div>
  );
}
