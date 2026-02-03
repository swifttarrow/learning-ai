"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Concept, LessonRecord } from "@/lib/data/types";

type LearnClientProps = {
  concepts: Concept[];
  initialLesson: LessonRecord | null;
  initialConceptId: string;
};

export default function LearnClient({
  concepts,
  initialLesson,
  initialConceptId,
}: LearnClientProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(initialConceptId);
  const [lesson, setLesson] = useState<LessonRecord | null>(initialLesson);
  const [isPending, startTransition] = useTransition();

  const selectedConcept = useMemo(
    () => concepts.find((concept) => concept.id === selectedId),
    [concepts, selectedId]
  );

  const handleSelect = async (conceptId: string) => {
    setSelectedId(conceptId);
    const response = await fetch(`/api/lessons?conceptId=${conceptId}`);
    const data = await response.json();
    setLesson(data.lesson ?? null);
  };

  const handleGenerate = async () => {
    if (!selectedId) return;
    startTransition(async () => {
      await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conceptId: selectedId }),
      });
      const response = await fetch(`/api/lessons?conceptId=${selectedId}`);
      const data = await response.json();
      setLesson(data.lesson ?? null);
      router.refresh();
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-[28px] border border-[var(--paper-edge)] bg-[var(--surface)] p-4">
        <p className="px-2 pb-3 text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
          Concept library
        </p>
        <div className="flex flex-col gap-2">
          {concepts.map((concept) => {
            const active = concept.id === selectedId;
            return (
              <button
                key={concept.id}
                onClick={() => handleSelect(concept.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  active
                    ? "border-[var(--accent)] bg-white text-[var(--foreground)] shadow-[0_10px_24px_rgba(194,73,20,0.2)]"
                    : "border-transparent text-[var(--ink-muted)] hover:border-[var(--paper-edge)] hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium">{concept.title}</span>
                  <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--accent-strong)]">
                    {concept.difficulty}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                  {concept.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </aside>
      <section className="flex flex-col gap-6 rounded-[28px] border border-[var(--paper-edge)] bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
              Selected concept
            </p>
            <h2 className="mt-2 font-[var(--font-display)] text-2xl text-[var(--foreground)]">
              {selectedConcept?.title ?? "Pick a concept"}
            </h2>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isPending || !selectedId}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(146,54,13,0.3)] transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {lesson ? "Regenerate lesson" : "Generate lesson"}
          </button>
        </div>

        {!lesson ? (
          <div className="rounded-[22px] border border-dashed border-[var(--paper-edge)] bg-[var(--surface)] p-6 text-sm text-[var(--ink-muted)]">
            Generate a lesson to see the structured breakdown here.
          </div>
        ) : (
          <div className="grid gap-6">
            <section className="grid gap-3">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                Why this matters
              </h3>
              <p className="text-sm leading-6 text-[var(--ink-muted)]">
                {lesson.content.why_it_matters}
              </p>
            </section>
            <section className="grid gap-3">
              <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                Core explanation
              </h3>
              <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                {lesson.content.core_explanation.map((item) => (
                  <li key={item} className="rounded-2xl bg-[var(--surface)] p-3">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="grid gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  Examples
                </h3>
                <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                  {lesson.content.examples.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-[var(--paper-edge)] p-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  Pitfalls
                </h3>
                <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                  {lesson.content.common_pitfalls.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-[var(--paper-edge)] p-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="grid gap-3 md:grid-cols-2">
              <div className="grid gap-2">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  Exercises
                </h3>
                <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                  {lesson.content.exercises.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl bg-[var(--surface)] p-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid gap-2">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  Next concepts
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lesson.content.next_concepts.length > 0 ? (
                    lesson.content.next_concepts.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--accent-strong)]"
                      >
                        {item.replace("-", " ")}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-[var(--ink-muted)]">
                      No prereqs listed.
                    </span>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </section>
    </div>
  );
}
