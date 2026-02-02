# AI-Native Engineer Learning App — Gameplan

## Goal

Build a lightweight web app that helps me become a more effective **AI-native engineer** by:

1. Generating high-quality explanatory articles on AI concepts with one click
2. Aggregating and summarizing the latest AI news relevant to builders

The app should prioritize **clarity, consistency, and practical relevance** over novelty.

---

## Core Features (MVP)

### Tab A — Learn

A single button generates a structured learning article covering one AI concept.

Each generated lesson includes:
- Title
- Why this matters (AI-native engineering context)
- Core explanation
- Examples
- Common pitfalls / misconceptions
- Exercises or “try it yourself” prompts
- Curated supporting links
- Suggested next concepts

Key constraint:
- Lessons are generated from a **curated concept library**, not randomly.

---

### Tab B — AI News

A continuously updated feed of recent AI developments.

Each news item includes:
- Headline
- Source + publish date
- Short summary
- “Why it matters for builders”
- Tags (models, research, tooling, policy, startups, etc.)

---

## Architecture Overview

### Frontend
- Next.js (App Router)
- Two routes:
  - `/learn`
  - `/news`
- Reader-style UI (list + content pane)
- Optional: stream lesson generation for better UX

### Backend (can live inside Next.js initially)
- Lesson generation service
- News ingestion + summarization service

### Storage
Relational DB (Postgres / SQLite initially)

Tables:
- `concepts`
- `lessons`
- `progress`
- `news_items`
- `news_summaries`

---

## Learn Pipeline (Detailed)

### 1. Concept Library

Seed a static concept graph (JSON / TS file initially):

Fields:
- `id`
- `title`
- `tags`
- `difficulty`
- `prereqs`
- `canonical_links` (optional)

Example concepts:
- Context windows
- Tokenization
- Embeddings vs completions
- Retrieval-augmented generation (RAG)
- Tool / function calling
- Prompt evaluation and regression testing
- Cost and latency tradeoffs
- Guardrails and failure modes

---

### 2. Lesson Generation

Flow:
1. Pick next concept based on progress
2. Call LLM with strict schema
3. Generate lesson as structured JSON
4. Store lesson
5. Render in UI

Design choice:
- **Schema-first generation** (never render raw markdown from the model)

---

### 3. Supporting Links Strategy

To avoid hallucinations:
- Option A (MVP): pre-curated links per concept
- Option B (later): model selects from an allow-listed set of trusted sources

---

### 4. Learning Feedback Loop

After each lesson:
- User rates difficulty:
  - Too easy
  - Just right
  - Too hard

Use this to:
- Adjust future concept selection
- Enable spaced repetition later

---

## AI News Pipeline (Detailed)

### 1. Source Selection

Use RSS / Atom feeds initially.

Examples:
- Model vendor blogs
- Research labs
- Reputable tech journalism AI sections

Store feeds in `feeds.yml` so they are configurable.

---

### 2. Ingestion

For each feed item:
- Fetch + parse
- Normalize fields:
  - title
  - url
  - source
  - published_at
- Deduplicate by URL + title hash
- Store raw item

---

### 3. Summarization

For each new item:
- Generate structured summary:
  - 1 sentence overview
  - 3 bullets: what happened
  - 2 bullets: why it matters for builders
  - Tags

Store summary separately from raw item.

---

### 4. Operational Considerations

- Server-side fetching only
- Normal User-Agent headers
- Retry + backoff
- Cache aggressively

---

## API Contracts (Schema-First)

### Lesson Schema

```json
{
  "title": "",
  "why_it_matters": "",
  "core_explanation": [],
  "examples": [],
  "common_pitfalls": [],
  "exercises": [],
  "links": [{ "title": "", "url": "" }],
  "next_concepts": []
}
News Summary Schema
{
  "headline": "",
  "what_happened": [],
  "why_it_matters_for_builders": [],
  "tags": []
}
Implementation Order
Scaffold Next.js app

Create /learn route + lesson generator endpoint

Seed concept library

Persist lessons

Add progress tracking

Add /news route

Build RSS ingestion job

Add summarization step

Render news feed

Polish UX (streaming, caching, search)