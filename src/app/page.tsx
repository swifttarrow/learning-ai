import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <PageLayout>
      <Card className="rounded-[36px] border-[var(--paper-edge)] bg-[var(--paper)] shadow-[var(--shadow)]">
        <CardContent className="grid gap-8 p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="flex flex-col gap-6">
            <Badge
              variant="outline"
              className="w-fit border-[var(--paper-edge)] bg-white/70 text-[10px] uppercase tracking-[0.35em] text-[var(--ink-subtle)]"
            >
              Build fluency, not trivia
            </Badge>
            <h1 className="font-[var(--font-display)] text-4xl leading-tight text-[var(--foreground)] sm:text-5xl">
              Become a sharper AI-native engineer with structured lessons and
              curated signals.
            </h1>
            <p className="max-w-xl text-base leading-7 text-[var(--ink-muted)]">
              Generate a focused concept lesson in seconds, then track the AI
              developments that actually change how builders ship.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)] shadow-[inset_0_0_0_1px_rgba(194,73,20,0.25)] hover:bg-[var(--accent)] hover:text-white"
              >
                <Link href="/learn">Start learning</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-[var(--paper-edge)] bg-white/70 text-[var(--foreground)] hover:border-[var(--accent-strong)] hover:text-[var(--accent-strong)]"
              >
                <Link href="/news">Scan AI news</Link>
              </Button>
            </div>
            <Card className="border-[var(--paper-edge)] bg-[var(--surface)] shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  What this app does
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-[var(--ink-muted)]">
                <p>One-click lessons grounded in a curated concept library.</p>
                <p>Structured outputs: explanations, pitfalls, and exercises.</p>
                <p>A living feed of AI news filtered for builder relevance.</p>
              </CardContent>
            </Card>
          </section>
          <section className="grid gap-4">
            <Card className="border-[var(--paper-edge)] bg-white shadow-[0_18px_40px_rgba(48,34,24,0.15)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  Today&apos;s focus
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <h2 className="font-[var(--font-display)] text-2xl text-[var(--foreground)]">
                  Retrieval-augmented generation
                </h2>
                <p className="text-sm leading-6 text-[var(--ink-muted)]">
                  Learn when to reach for RAG, how to evaluate it, and where
                  teams usually misconfigure it in production.
                </p>
                <Separator className="bg-[var(--paper-edge)]" />
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  <Badge className="bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                    Lesson
                  </Badge>
                  <span>Difficulty: intermediate</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[var(--paper-edge)] bg-[var(--surface)] shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
                  News snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  Model vendors shift toward tool safety defaults
                </h3>
                <p className="text-sm leading-6 text-[var(--ink-muted)]">
                  Keep an eye on tool gating updates and consider how they
                  affect production workflows, evaluation suites, and guardrail
                  designs.
                </p>
              </CardContent>
            </Card>
          </section>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
