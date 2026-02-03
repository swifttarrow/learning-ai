"use client";

import { useMemo, useState } from "react";
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
      <aside className="rounded-[28px] border border-[var(--paper-edge)] bg-[var(--surface)] p-4">
        <p className="px-2 pb-3 text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
          Latest items
        </p>
        <div className="flex flex-col gap-3">
          {items.map((item) => {
            const active = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  active
                    ? "border-[var(--accent)] bg-white text-[var(--foreground)] shadow-[0_10px_24px_rgba(194,73,20,0.2)]"
                    : "border-transparent text-[var(--ink-muted)] hover:border-[var(--paper-edge)] hover:bg-white"
                }`}
              >
                <p className="font-medium">{item.title}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  {item.source}
                </p>
              </button>
            );
          })}
        </div>
      </aside>
      <section className="flex flex-col gap-6 rounded-[28px] border border-[var(--paper-edge)] bg-white p-6">
        {!selectedItem ? (
          <div className="rounded-[22px] border border-dashed border-[var(--paper-edge)] bg-[var(--surface)] p-6 text-sm text-[var(--ink-muted)]">
            No news items yet. Add RSS ingestion to populate the feed.
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
                  {new Date(selectedItem.publishedAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </p>
                <h2 className="mt-2 font-[var(--font-display)] text-2xl text-[var(--foreground)]">
                  {selectedItem.summary.headline}
                </h2>
              </div>
              <div className="rounded-full bg-[var(--surface)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
                {selectedItem.source}
              </div>
            </div>
            <section className="grid gap-3">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                What happened
              </h3>
              <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                {selectedItem.summary.what_happened.map((item) => (
                  <li key={item} className="rounded-2xl bg-[var(--surface)] p-3">
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
                {selectedItem.summary.why_it_matters_for_builders.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-[var(--paper-edge)] p-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="flex flex-wrap gap-2">
              {selectedItem.summary.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]"
                >
                  {tag}
                </span>
              ))}
            </section>
          </>
        )}
      </section>
    </div>
  );
}
