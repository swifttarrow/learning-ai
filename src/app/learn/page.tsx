import PageLayout from "@/components/PageLayout";
import { concepts } from "@/lib/data/concepts";
import { getLessonByConcept } from "@/lib/data/lessons";
import LearnClient from "./LearnClient";

type LearnPageProps = {
  searchParams: { concept?: string };
};

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const selectedId = searchParams.concept ?? concepts[0]?.id ?? "";
  const lesson = selectedId ? await getLessonByConcept(selectedId) : null;

  return (
    <PageLayout>
      <main className="rounded-[36px] border border-[var(--paper-edge)] bg-[var(--paper)] p-8 shadow-[var(--shadow)]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
              Learn
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-3xl text-[var(--foreground)]">
              Concept lessons
            </h1>
          </div>
          <div className="rounded-full bg-[var(--surface)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
            Schema-first lessons
          </div>
        </div>
        <LearnClient
          concepts={concepts}
          initialLesson={lesson}
          initialConceptId={selectedId}
        />
      </main>
    </PageLayout>
  );
}
