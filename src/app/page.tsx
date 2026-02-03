import Link from "next/link";
import PageLayout from "@/components/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <section className="grid gap-4" />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
