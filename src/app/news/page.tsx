import PageLayout from "@/components/PageLayout";
import { getNewsSummaries } from "@/lib/data/news";
import NewsClient from "./NewsClient";

export default async function NewsPage() {
  const items = await getNewsSummaries();

  return (
    <PageLayout>
      <main className="rounded-[36px] border border-[var(--paper-edge)] bg-[var(--paper)] p-8 shadow-[var(--shadow)]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
              AI News
            </p>
            <h1 className="mt-2 font-[var(--font-display)] text-3xl text-[var(--foreground)]">
              Builder relevance feed
            </h1>
          </div>
          <div className="rounded-full bg-[var(--surface)] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[var(--ink-subtle)]">
            Updated daily
          </div>
        </div>
        <NewsClient items={items} />
      </main>
    </PageLayout>
  );
}
