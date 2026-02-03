import Link from "next/link";
import PageLayout from "@/components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <main className="grid gap-8 rounded-[36px] border border-[var(--paper-edge)] bg-[var(--paper)] p-10 shadow-[var(--shadow)] lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--ink-subtle)]">
            Build fluency, not trivia
          </p>
          <h1 className="font-[var(--font-display)] text-4xl leading-tight text-[var(--foreground)] sm:text-5xl">
            Become a sharper AI-native engineer with structured lessons and
            curated signals.
          </h1>
          <p className="max-w-xl text-base leading-7 text-[var(--ink-muted)]">
            Generate a focused concept lesson in seconds, then track the AI
            developments that actually change how builders ship.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="rounded-full bg-[var(--accent-soft)] px-6 py-3 text-sm font-semibold text-[var(--accent-strong)] shadow-[inset_0_0_0_1px_rgba(194,73,20,0.25)] transition hover:bg-[var(--accent)] hover:text-white"
            >
              Start learning
            </Link>
            <Link
              href="/news"
              className="rounded-full border border-[var(--paper-edge)] bg-white/70 px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--accent-strong)] hover:text-[var(--accent-strong)]"
            >
              Scan AI news
            </Link>
          </div>
          <div className="grid gap-4 rounded-[24px] border border-[var(--paper-edge)] bg-[var(--surface)] p-6 text-sm text-[var(--ink-muted)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
              What this app does
            </p>
            <ul className="grid gap-3">
              <li>One-click lessons grounded in a curated concept library.</li>
              <li>Structured outputs: explanations, pitfalls, and exercises.</li>
              <li>
                A living feed of AI news filtered for builder relevance.
              </li>
            </ul>
          </div>
        </section>
        <section className="grid gap-4">
          <div className="rounded-[28px] border border-[var(--paper-edge)] bg-white p-6 shadow-[0_18px_40px_rgba(48,34,24,0.15)]">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
              Today&apos;s focus
            </p>
            <h2 className="mt-3 font-[var(--font-display)] text-2xl text-[var(--foreground)]">
              Retrieval-augmented generation
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
              Learn when to reach for RAG, how to evaluate it, and where teams
              usually misconfigure it in production.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
              <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[var(--accent-strong)]">
                Lesson
              </span>
              <span>Difficulty: intermediate</span>
            </div>
          </div>
          <div className="rounded-[28px] border border-[var(--paper-edge)] bg-[var(--surface)] p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
              News snapshot
            </p>
            <h3 className="mt-3 text-lg font-semibold text-[var(--foreground)]">
              Model vendors shift toward tool safety defaults
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
              Keep an eye on tool gating updates and consider how they affect
              production workflows, evaluation suites, and guardrail designs.
            </p>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
