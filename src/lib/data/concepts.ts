import { createClient } from "@/lib/supabase/server";
import type { Concept } from "./types";

const memoryConcepts = new Map<string, Concept>();

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function toRow(concept: Concept) {
  return {
    id: concept.id,
    title: concept.title,
    tags: concept.tags,
    difficulty: concept.difficulty,
    prereqs: concept.prereqs,
    canonical_links: concept.canonicalLinks ?? [],
  };
}

function fromRow(row: {
  id: string;
  title: string;
  tags: string[];
  difficulty: Concept["difficulty"];
  prereqs: string[];
  canonical_links: { title: string; url: string }[] | null;
}): Concept {
  return {
    id: row.id,
    title: row.title,
    tags: row.tags ?? [],
    difficulty: row.difficulty,
    prereqs: row.prereqs ?? [],
    canonicalLinks: row.canonical_links ?? undefined,
  };
}

export async function getConcepts(): Promise<Concept[]> {
  if (!isSupabaseConfigured) {
    return Array.from(memoryConcepts.values());
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("concepts")
    .select("id, title, tags, difficulty, prereqs, canonical_links")
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map(fromRow);
}

export async function getExistingConceptIds(): Promise<Set<string>> {
  if (!isSupabaseConfigured) {
    return new Set(memoryConcepts.keys());
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("concepts").select("id");

  if (error || !data) {
    return new Set();
  }

  return new Set(data.map((row) => row.id));
}

export async function createConcept(concept: Concept): Promise<Concept> {
  if (!isSupabaseConfigured) {
    memoryConcepts.set(concept.id, concept);
    return concept;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("concepts")
    .upsert(toRow(concept))
    .select("id, title, tags, difficulty, prereqs, canonical_links")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Unable to create concept.");
  }

  return fromRow(data);
}

export async function getConceptById(
  conceptId: string
): Promise<Concept | null> {
  if (!isSupabaseConfigured) {
    return memoryConcepts.get(conceptId) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("concepts")
    .select("id, title, tags, difficulty, prereqs, canonical_links")
    .eq("id", conceptId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return fromRow(data);
}
