import OpenAI from "openai";
import type { Concept, LessonContent } from "@/lib/data/types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const lessonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    why_it_matters: { type: "string" },
    core_explanation: { type: "array", items: { type: "string" } },
    deep_dive: { type: "array", items: { type: "string" } },
    examples: { type: "array", items: { type: "string" } },
    common_pitfalls: { type: "array", items: { type: "string" } },
    exercises: { type: "array", items: { type: "string" } },
    links: {
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
    next_concepts: { type: "array", items: { type: "string" } },
  },
  required: [
    "title",
    "why_it_matters",
    "core_explanation",
    "deep_dive",
    "examples",
    "common_pitfalls",
    "exercises",
    "links",
    "next_concepts",
  ],
} as const;

export async function generateLessonFromModel(
  concept: Concept
): Promise<LessonContent> {
  const system = [
    "You are a meticulous AI-native engineering tutor.",
    "Return only JSON that matches the provided schema.",
    "Keep outputs concise, practical, and builder-focused.",
  ].join(" ");

  const user = [
    `Generate a lesson for the concept: ${concept.title}.`,
    `Difficulty: ${concept.difficulty}.`,
    `Tags: ${concept.tags.join(", ") || "none"}.`,
    `Prereqs: ${concept.prereqs.join(", ") || "none"}.`,
    "Write core_explanation as 3 single-sentence summaries (one sentence per array item).",
    "Add a deep_dive section with 2 paragraphs, each 4-5 sentences.",
    "Use 3-5 bullets per list where possible.",
    "Write why_it_matters as a short paragraph of 3-4 sentences.",
    "Use only the provided canonical links if any are available; otherwise return an empty links array (do not invent links).",
  ].join(" ");

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "lesson_schema",
        description: "Structured lesson content for AI-native engineers.",
        schema: lessonSchema,
        strict: true,
      },
    },
  });

  const text = completion.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("No JSON returned from model.");
  }

  return JSON.parse(text) as LessonContent;
}
