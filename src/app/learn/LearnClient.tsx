"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Concept, LessonRecord } from "@/lib/data/types";

type LearnClientProps = {
  initialConcepts: Concept[];
  initialLesson: LessonRecord | null;
  initialConceptId: string;
};

export default function LearnClient({
  initialConcepts,
  initialLesson,
  initialConceptId,
}: LearnClientProps) {
  const router = useRouter();
  const [concepts, setConcepts] = useState<Concept[]>(initialConcepts);
  const [selectedId, setSelectedId] = useState(initialConceptId);
  const [lesson, setLesson] = useState<LessonRecord | null>(initialLesson);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedConcept = useMemo(
    () => concepts.find((concept) => concept.id === selectedId),
    [concepts, selectedId]
  );

  useEffect(() => {
    if (!selectedId && concepts.length > 0) {
      setSelectedId(concepts[0].id);
    }
  }, [concepts, selectedId]);

  const handleSelect = async (conceptId: string) => {
    setSelectedId(conceptId);
    setError(null);
    try {
      const response = await fetch(`/api/lessons?conceptId=${conceptId}`, {
        cache: "no-store",
      });
      const data = await response.json();
      setLesson(data.lesson ?? null);
    } catch (err) {
      setLesson(null);
      setError(
        err instanceof Error ? err.message : "Failed to load the lesson."
      );
    }
  };

  const handleGenerate = async () => {
    startTransition(async () => {
      setError(null);
      try {
        const response = await fetch("/api/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        });

        const data = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(data?.error ?? "Failed to generate the lesson.");
        }
        if (!data?.lesson || !data?.concept) {
          throw new Error("Lesson generation returned no content.");
        }
        setLesson(data.lesson);
        setConcepts((prev) => {
          const exists = prev.some((item) => item.id === data.concept.id);
          return exists ? prev : [...prev, data.concept];
        });
        setSelectedId(data.concept.id);
        router.refresh();
      } catch (err) {
        setLesson(null);
        setError(
          err instanceof Error ? err.message : "Failed to generate the lesson."
        );
      }
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <Card className="rounded-[28px] border-[var(--paper-edge)] bg-[var(--surface)] shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
            Generated lessons
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {concepts.length === 0 ? (
            <Card className="border-[var(--paper-edge)] bg-white/80 shadow-none">
              <CardContent className="p-4 text-sm text-[var(--ink-muted)]">
                No lessons yet. Generate one to start your library.
              </CardContent>
            </Card>
          ) : (
            concepts.map((concept) => {
              const active = concept.id === selectedId;
              return (
                <Button
                  key={concept.id}
                  type="button"
                  variant="outline"
                  onClick={() => handleSelect(concept.id)}
                  className={`h-auto w-full flex-col items-start gap-2 rounded-2xl border px-4 py-3 text-left text-sm transition whitespace-normal ${
                    active
                      ? "border-[var(--accent)] bg-white text-[var(--foreground)] shadow-[0_10px_24px_rgba(194,73,20,0.2)]"
                      : "border-[var(--paper-edge)] bg-transparent text-[var(--ink-muted)] hover:border-[var(--accent-soft)] hover:bg-white"
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <span className="min-w-0 flex-1 break-words font-medium">
                      {concept.title}
                    </span>
                    <Badge className="bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                      {concept.difficulty}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--ink-subtle)]">
                    {concept.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </Button>
              );
            })
          )}
        </CardContent>
      </Card>
      {lesson || isPending || error ? (
        <Card className="rounded-[28px] border-[var(--paper-edge)] bg-white">
          <CardHeader className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle className="text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
                Selected concept
              </CardTitle>
              <h2 className="mt-2 font-[var(--font-display)] text-2xl text-[var(--foreground)]">
                {selectedConcept?.title ?? "Pick a concept"}
              </h2>
            </div>
            <div />
          </CardHeader>
          <CardContent className="grid gap-6">
            {isPending ? (
              <Card className="border-[var(--paper-edge)] bg-[var(--surface)] shadow-none">
                <CardContent className="flex items-center gap-3 p-5 text-sm text-[var(--ink-muted)]">
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent-soft)] border-t-[var(--accent-strong)]" />
                  Generating lesson...
                </CardContent>
              </Card>
            ) : null}
            {error ? (
              <Card className="border-destructive/40 bg-destructive/10 text-destructive shadow-none">
                <CardContent className="p-4 text-sm">
                  {error}
                </CardContent>
              </Card>
            ) : null}
            {!lesson ? null : (
              <div className="grid gap-6">
                <section className="grid gap-3">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                    Why this matters
                  </h3>
                <p className="text-sm leading-6 text-[var(--ink-muted)]">
                  {lesson.content.why_it_matters}
                </p>
              </section>
              <Separator className="bg-[var(--paper-edge)]" />
              <section className="grid gap-3">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  Core explanation
                </h3>
                <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                  {lesson.content.core_explanation.map((item) => (
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
                  Deep dive
                </h3>
                <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                  {(lesson.content.deep_dive ?? []).map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl border border-[var(--paper-edge)] bg-white p-3"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="grid items-start gap-3 md:grid-cols-2">
                <div className="grid gap-2">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                    Examples
                  </h3>
                  <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                    {lesson.content.examples.length ? (
                      lesson.content.examples.map((item) => (
                        <li
                          key={item}
                          className="rounded-2xl border border-[var(--paper-edge)] p-3"
                        >
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="rounded-2xl border border-dashed border-[var(--paper-edge)] bg-[var(--surface)] p-3 text-[var(--ink-muted)]">
                        No examples yet.
                      </li>
                    )}
                  </ul>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                    Pitfalls
                  </h3>
                  <ul className="grid gap-2 text-sm text-[var(--foreground)]">
                    {lesson.content.common_pitfalls.length ? (
                      lesson.content.common_pitfalls.map((item) => (
                        <li
                          key={item}
                          className="rounded-2xl border border-[var(--paper-edge)] p-3"
                        >
                          {item}
                        </li>
                      ))
                    ) : (
                      <li className="rounded-2xl border border-dashed border-[var(--paper-edge)] bg-[var(--surface)] p-3 text-[var(--ink-muted)]">
                        No pitfalls listed.
                      </li>
                    )}
                  </ul>
                </div>
              </section>
              <section className="grid items-start gap-3 md:grid-cols-2">
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
                  <div className="grid gap-2">
                    {lesson.content.next_concepts.length > 0 ? (
                      lesson.content.next_concepts.map((item) => (
                        <Badge
                          key={item}
                          className="w-full justify-start whitespace-normal break-words bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent-strong)]"
                        >
                          {item.replace("-", " ")}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-[var(--ink-muted)]">
                        No prereqs listed.
                      </span>
                    )}
                  </div>
                </div>
              </section>
              <section className="grid gap-3">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  Resources
                </h3>
                {lesson.content.links.length ? (
                  <div className="grid gap-2 text-sm">
                    {lesson.content.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl border border-[var(--paper-edge)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] transition hover:border-[var(--accent-strong)]"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>
                ) : (
                  <Card className="border-[var(--paper-edge)] bg-[var(--surface)] shadow-none">
                    <CardContent className="p-4 text-sm text-[var(--ink-muted)]">
                      No vetted resources yet.
                    </CardContent>
                  </Card>
                )}
              </section>
            </div>
          )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
