import type { Concept, LessonContent } from "./types";

const scaffold = {
  core_explanation: [
    "Define the concept in plain language and anchor it to a real engineering workflow.",
    "Describe the moving parts and how they interact in a production system.",
    "Call out the signals that indicate when the concept matters most.",
  ],
  examples: [
    "Walk through a lightweight prototype and explain the tradeoffs you made.",
    "Contrast a naive implementation with a refined version.",
  ],
  common_pitfalls: [
    "Optimizing too early without measuring the baseline.",
    "Skipping evaluation checkpoints and relying on intuition.",
  ],
  exercises: [
    "Write a short spec for when you would apply this concept in your stack.",
    "Draft a quick experiment to validate the outcome.",
  ],
};

export function buildLessonContent(concept: Concept): LessonContent {
  return {
    title: concept.title,
    why_it_matters: `AI-native teams use ${concept.title.toLowerCase()} to ship reliable behavior, reduce iteration time, and make model choices with intent.`,
    core_explanation: scaffold.core_explanation.map(
      (line) => `${line} (${concept.title})`
    ),
    examples: scaffold.examples.map(
      (line) => `${line} Example tied to ${concept.title}.`
    ),
    common_pitfalls: scaffold.common_pitfalls.map(
      (line) => `${line} Pitfall when working with ${concept.title}.`
    ),
    exercises: scaffold.exercises.map(
      (line) => `${line} Focus it on ${concept.title}.`
    ),
    links:
      concept.canonicalLinks?.length && concept.canonicalLinks.length > 0
        ? concept.canonicalLinks
        : [
            {
              title: "Curated AI engineering notes",
              url: "https://platform.openai.com/docs",
            },
          ],
    next_concepts: concept.prereqs.length ? concept.prereqs : [],
  };
}
