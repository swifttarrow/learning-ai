import OpenAI from "openai";
import type { Concept } from "@/lib/data/types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const conceptSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    tags: { type: "array", items: { type: "string" } },
    difficulty: {
      type: "string",
      enum: ["beginner", "intermediate", "advanced"],
    },
    prereqs: { type: "array", items: { type: "string" } },
    canonicalLinks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          url: { type: "string" },
        },
        required: ["title", "url"],
      },
    },
  },
  required: ["title", "tags", "difficulty", "prereqs", "canonicalLinks"],
} as const;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function normalizeTitle(value: string) {
  return value.trim().toLowerCase();
}

export async function generateConceptFromModel(
  existing: Concept[]
): Promise<Concept> {
  const existingTitles = existing.map((item) => item.title).slice(0, 120);
  const existingIds = new Set(existing.map((item) => item.id));
  const existingTitleSet = new Set(existing.map((item) => normalizeTitle(item.title)));

  const system = [
    "You are a curriculum designer for AI-native engineering.",
    "Return a single concept that does not overlap with existing concepts.",
    "The concept must be fundamental and transferable across products.",
    "Avoid app-specific product ideas or business domains.",
    "Focus on model behavior, prompting, evaluation, retrieval, tool use, safety, deployment, monitoring, or cost/latency tradeoffs.",
    "Avoid very advanced research topics.",
    "Keep it practical for builders.",
    "Return only JSON that matches the schema.",
  ].join(" ");

  const user = [
    "Generate one new AI-native engineering concept.",
    "It must be distinct from these existing concepts:",
    existingTitles.length ? existingTitles.join(" | ") : "none",
    "Pick a difficulty between beginner, intermediate, or advanced.",
    "Provide 2-4 tags, 0-3 prereqs (by title), and 0-2 canonical links.",
    "Avoid concepts like product dashboards, vertical apps, or generic productivity tooling.",
  ].join(" ");

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "concept_schema",
          description: "New AI-native engineering concept.",
          schema: conceptSchema,
          strict: true,
        },
      },
    });

    const text = completion.choices?.[0]?.message?.content;
    if (!text) {
      continue;
    }

    const parsed = JSON.parse(text) as Omit<Concept, "id">;
    const id = slugify(parsed.title);
    const normalizedTitle = normalizeTitle(parsed.title);

    if (!id || existingIds.has(id) || existingTitleSet.has(normalizedTitle)) {
      continue;
    }

    return {
      id,
      title: parsed.title.trim(),
      tags: parsed.tags ?? [],
      difficulty: parsed.difficulty,
      prereqs: parsed.prereqs ?? [],
      canonicalLinks: parsed.canonicalLinks?.length
        ? parsed.canonicalLinks
        : undefined,
    };
  }

  throw new Error("Failed to generate a unique concept.");
}
