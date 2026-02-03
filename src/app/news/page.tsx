import PageLayout from "@/components/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNewsSummaries } from "@/lib/data/news";
import NewsClient from "./NewsClient";

export default async function NewsPage() {
  const items = await getNewsSummaries();

  return (
    <PageLayout>
      <Card className="rounded-[36px] border-[var(--paper-edge)] bg-[var(--paper)] shadow-[var(--shadow)]">
        <CardHeader className="flex flex-row items-start justify-between gap-4 p-8">
          <div>
            <CardTitle className="text-xs uppercase tracking-[0.3em] text-[var(--ink-subtle)]">
              AI News
            </CardTitle>
            <h1 className="mt-2 font-[var(--font-display)] text-3xl text-[var(--foreground)]">
              Builder relevance feed
            </h1>
          </div>
          <Badge className="bg-[var(--surface)] text-[var(--ink-subtle)]">
            Updated daily
          </Badge>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <NewsClient items={items} />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
