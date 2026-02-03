import { createClient } from "@/lib/supabase/server";
import type { NewsSummaryRecord } from "./types";

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const sampleNews: NewsSummaryRecord[] = [
  {
    id: "sample-1",
    newsItemId: "sample-item-1",
    title: "Model vendors shift toward tool safety defaults",
    source: "Lab Notes",
    url: "https://example.com/tool-safety",
    publishedAt: "2026-02-01T14:00:00Z",
    summary: {
      headline: "Model vendors shift toward tool safety defaults",
      what_happened: [
        "Multiple providers updated defaults for tool calling and guardrails.",
        "Safer execution modes are now opt-out instead of opt-in.",
        "Eval suites are being bundled with hosted tool runtimes.",
      ],
      why_it_matters_for_builders: [
        "Your tool orchestration pipeline might need new allowlists.",
        "Regression tests should cover safety gating changes.",
      ],
      tags: ["tooling", "safety", "platforms"],
    },
  },
  {
    id: "sample-2",
    newsItemId: "sample-item-2",
    title: "Open-weight reasoning models land in more teams",
    source: "Research Brief",
    url: "https://example.com/open-weight",
    publishedAt: "2026-01-30T09:30:00Z",
    summary: {
      headline: "Open-weight reasoning models land in more teams",
      what_happened: [
        "Smaller reasoning models reached parity on a few common evals.",
        "Teams are experimenting with hybrid routing for cost control.",
        "New tooling focuses on calibrating reasoning depth.",
      ],
      why_it_matters_for_builders: [
        "Cheaper reasoning opens room for more eval and QA passes.",
        "Routing decisions need observability to avoid regressions.",
      ],
      tags: ["models", "open-weight", "evaluation"],
    },
  },
];

export async function getNewsSummaries(): Promise<NewsSummaryRecord[]> {
  if (!isSupabaseConfigured) {
    return sampleNews;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news_items")
    .select(
      "id, title, source, url, published_at, news_summaries(id, summary)"
    )
    .order("published_at", { ascending: false })
    .limit(50);

  if (error || !data) {
    return sampleNews;
  }

  return data.flatMap((item) => {
    if (!item.news_summaries?.length) {
      return [];
    }
    const summary = item.news_summaries[0];
    return [
      {
        id: summary.id,
        newsItemId: item.id,
        title: item.title,
        source: item.source,
        url: item.url,
        publishedAt: item.published_at,
        summary: summary.summary,
      } as NewsSummaryRecord,
    ];
  });
}
