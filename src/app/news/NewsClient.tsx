"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { NewsSummaryRecord } from "@/lib/data/types";

type NewsClientProps = {
  items: NewsSummaryRecord[];
};

export default function NewsClient({ items }: NewsClientProps) {
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");

  const selectedItem = useMemo(
    () => items.find((item) => item.id === selectedId),
    [items, selectedId]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="rounded-[28px] border-[var(--paper-edge)] bg-[var(--surface)] shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
            Latest items
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {items.map((item) => {
            const active = item.id === selectedId;
            return (
              <Button
                key={item.id}
                type="button"
                variant="outline"
                onClick={() => setSelectedId(item.id)}
                className={`h-auto w-full flex-col items-start gap-2 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  active
                    ? "border-[var(--accent)] bg-white text-[var(--foreground)] shadow-[0_10px_24px_rgba(194,73,20,0.2)]"
                    : "border-[var(--paper-edge)] bg-transparent text-[var(--ink-muted)] hover:border-[var(--accent-soft)] hover:bg-white"
                }`}
              >
                <p className="font-medium">{item.title}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  {item.source}
                </p>
              </Button>
            );
          })}
        </CardContent>
      </Card>
      <Card className="rounded-[28px] border-[var(--paper-edge)] bg-white">
        <CardContent className="grid gap-6 p-6">
          {!selectedItem ? (
            <Card className="border-[var(--paper-edge)] bg-[var(--surface)] shadow-none">
              <CardContent className="p-6 text-sm text-[var(--ink-muted)]">
                No news items yet. Add RSS ingestion to populate the feed.
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Badge
                    variant="outline"
                    className="border-[var(--paper-edge)] bg-white/70 text-[10px] uppercase tracking-[0.25em] text-[var(--ink-subtle)]"
                  >
                    {new Date(selectedItem.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </Badge>
                  <h2 className="mt-3 font-[var(--font-display)] text-2xl text-[var(--foreground)]">
                    {selectedItem.summary.headline}
                  </h2>
                </div>
                <Badge className="bg-[var(--surface)] text-[var(--ink-subtle)]">
                  {selectedItem.source}
                </Badge>
              </div>
              <Separator className="bg-[var(--paper-edge)]" />
              <section className="grid gap-3">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  What happened
                </h3>
                <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                  {selectedItem.summary.what_happened.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl bg-[var(--surface)] p-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="grid gap-3">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  Why it matters for builders
                </h3>
                <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                  {selectedItem.summary.why_it_matters_for_builders.map(
                    (item) => (
                      <li
                        key={item}
                        className="rounded-2xl border border-[var(--paper-edge)] p-3"
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </section>
              <section className="flex flex-wrap gap-2">
                {selectedItem.summary.tags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                  >
                    {tag}
                  </Badge>
                ))}
              </section>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
