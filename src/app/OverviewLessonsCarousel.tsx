"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type LessonItem = {
  lessonId: string;
  conceptId: string;
  conceptTitle: string;
  whyItMatters: string;
  createdAt: string;
};

type OverviewLessonsCarouselProps = {
  items: LessonItem[];
};

export default function OverviewLessonsCarousel({
  items,
}: OverviewLessonsCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = items.length;

  if (!total) {
    return (
      <Card className="border-[var(--paper-edge)] bg-[var(--surface)] shadow-none">
        <CardContent className="p-6 text-sm text-[var(--ink-muted)]">
          No lessons yet. Generate your first lesson to see it here.
        </CardContent>
      </Card>
    );
  }

  const current = items[index];

  return (
    <Card className="border-[var(--paper-edge)] bg-white shadow-[0_18px_40px_rgba(48,34,24,0.15)]">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <CardTitle className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
            Latest lesson
          </CardTitle>
          <h2 className="mt-3 font-[var(--font-display)] text-2xl text-[var(--foreground)]">
            {current.conceptTitle}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
            className="rounded-full"
            aria-label="Previous lesson"
          >
            ←
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => setIndex((prev) => (prev + 1) % total)}
            className="rounded-full"
            aria-label="Next lesson"
          >
            →
          </Button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-sm leading-6 text-[var(--ink-muted)]">
          {current.whyItMatters}
        </p>
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
          <span>
            {new Date(current.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <Link
            href={`/learn?concept=${current.conceptId}`}
            className="rounded-full border border-[var(--paper-edge)] px-3 py-1 text-[var(--foreground)] transition hover:border-[var(--accent-strong)]"
          >
            Open lesson
          </Link>
        </div>
        {total > 1 ? (
          <div className="flex items-center justify-center gap-2">
            {items.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`h-2 w-2 rounded-full ${
                  dotIndex === index
                    ? "bg-[var(--accent-strong)]"
                    : "bg-[var(--paper-edge)]"
                }`}
              />
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
