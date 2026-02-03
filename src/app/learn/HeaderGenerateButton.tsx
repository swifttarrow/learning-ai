"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HeaderGenerateButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleGenerate = () => {
    startTransition(async () => {
      const response = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.lesson && data?.concept) {
        window.dispatchEvent(
          new CustomEvent("lesson:generated", { detail: data })
        );
      }
      router.refresh();
    });
  };

  return (
    <Button
      onClick={handleGenerate}
      disabled={isPending}
      className="rounded-full bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(146,54,13,0.35)] hover:bg-[color:var(--accent-strong)] disabled:opacity-70"
    >
      {isPending ? "Generating..." : "Generate lesson"}
    </Button>
  );
}
