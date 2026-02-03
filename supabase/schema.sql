create extension if not exists "pgcrypto";

create table if not exists concepts (
  id text primary key,
  title text not null,
  tags text[] not null default '{}',
  difficulty text not null,
  prereqs text[] not null default '{}',
  canonical_links jsonb default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  concept_id text not null references concepts(id) on delete cascade,
  content jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists lessons_concept_id_idx on lessons (concept_id);

create table if not exists progress (
  id uuid primary key default gen_random_uuid(),
  concept_id text not null references concepts(id) on delete cascade,
  rating text not null,
  last_viewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists news_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null unique,
  source text not null,
  published_at timestamptz not null,
  created_at timestamptz not null default now()
);

create index if not exists news_items_published_at_idx on news_items (published_at desc);

create table if not exists news_summaries (
  id uuid primary key default gen_random_uuid(),
  news_item_id uuid not null references news_items(id) on delete cascade,
  summary jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists news_summaries_news_item_id_idx on news_summaries (news_item_id);
