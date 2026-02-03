import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getConcepts } from "@/lib/data/concepts";
import { getLessonByConcept } from "@/lib/data/lessons";
import LearnClient from "./LearnClient";
import HeaderGenerateButton from "./HeaderGenerateButton";

type LearnPageProps = {
  searchParams: { concept?: string };
};

export default async function LearnPage({ searchParams }: LearnPageProps) {
  const concepts = await getConcepts();
  const selectedId = searchParams.concept ?? concepts[0]?.id ?? "";
  const lesson = selectedId ? await getLessonByConcept(selectedId) : null;

  return (
    <PageLayout>
      <Card className="rounded-[36px] border-[var(--paper-edge)] bg-[var(--paper)] shadow-[var(--shadow)]">
        <CardHeader className="flex flex-row items-start justify-between gap-4 p-8">
          <div>
            <CardTitle className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
              Learn
            </CardTitle>
            <h1 className="mt-2 font-[var(--font-display)] text-3xl text-[var(--foreground)]">
              Concept lessons
            </h1>
          </div>
          <HeaderGenerateButton />
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <LearnClient
            initialConcepts={concepts}
            initialLesson={lesson}
            initialConceptId={selectedId}
          />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
