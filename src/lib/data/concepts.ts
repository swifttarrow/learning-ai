import type { Concept } from "./types";

export const concepts: Concept[] = [
  {
    id: "context-windows",
    title: "Context windows",
    tags: ["models", "limits", "prompting"],
    difficulty: "beginner",
    prereqs: [],
    canonicalLinks: [
      { title: "OpenAI token limits", url: "https://platform.openai.com/docs" },
    ],
  },
  {
    id: "tokenization",
    title: "Tokenization",
    tags: ["models", "costs"],
    difficulty: "beginner",
    prereqs: ["context-windows"],
  },
  {
    id: "embeddings-vs-completions",
    title: "Embeddings vs completions",
    tags: ["representations", "retrieval"],
    difficulty: "beginner",
    prereqs: ["tokenization"],
  },
  {
    id: "rag",
    title: "Retrieval-augmented generation (RAG)",
    tags: ["retrieval", "systems"],
    difficulty: "intermediate",
    prereqs: ["embeddings-vs-completions"],
  },
  {
    id: "tool-calling",
    title: "Tool and function calling",
    tags: ["agents", "orchestration"],
    difficulty: "intermediate",
    prereqs: ["rag"],
  },
  {
    id: "prompt-eval",
    title: "Prompt evaluation and regression testing",
    tags: ["quality", "experiments"],
    difficulty: "intermediate",
    prereqs: ["tool-calling"],
  },
  {
    id: "cost-latency-tradeoffs",
    title: "Cost and latency tradeoffs",
    tags: ["ops", "scaling"],
    difficulty: "intermediate",
    prereqs: ["prompt-eval"],
  },
  {
    id: "guardrails",
    title: "Guardrails and failure modes",
    tags: ["safety", "ops"],
    difficulty: "advanced",
    prereqs: ["cost-latency-tradeoffs"],
  },
];
