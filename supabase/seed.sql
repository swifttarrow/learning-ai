insert into concepts (id, title, tags, difficulty, prereqs, canonical_links)
values
  (
    'context-windows',
    'Context windows',
    array['models', 'limits', 'prompting'],
    'beginner',
    array[]::text[],
    '[{"title":"OpenAI token limits","url":"https://platform.openai.com/docs"}]'::jsonb
  ),
  (
    'tokenization',
    'Tokenization',
    array['models', 'costs'],
    'beginner',
    array['context-windows'],
    '[]'::jsonb
  ),
  (
    'embeddings-vs-completions',
    'Embeddings vs completions',
    array['representations', 'retrieval'],
    'beginner',
    array['tokenization'],
    '[]'::jsonb
  ),
  (
    'rag',
    'Retrieval-augmented generation (RAG)',
    array['retrieval', 'systems'],
    'intermediate',
    array['embeddings-vs-completions'],
    '[]'::jsonb
  ),
  (
    'tool-calling',
    'Tool and function calling',
    array['agents', 'orchestration'],
    'intermediate',
    array['rag'],
    '[]'::jsonb
  ),
  (
    'prompt-eval',
    'Prompt evaluation and regression testing',
    array['quality', 'experiments'],
    'intermediate',
    array['tool-calling'],
    '[]'::jsonb
  ),
  (
    'cost-latency-tradeoffs',
    'Cost and latency tradeoffs',
    array['ops', 'scaling'],
    'intermediate',
    array['prompt-eval'],
    '[]'::jsonb
  ),
  (
    'guardrails',
    'Guardrails and failure modes',
    array['safety', 'ops'],
    'advanced',
    array['cost-latency-tradeoffs'],
    '[]'::jsonb
  )
on conflict (id) do update
  set title = excluded.title,
      tags = excluded.tags,
      difficulty = excluded.difficulty,
      prereqs = excluded.prereqs,
      canonical_links = excluded.canonical_links;
