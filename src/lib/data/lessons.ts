import { createClient } from "@/lib/supabase/server";
import { concepts } from "./concepts";
import { buildLessonContent } from "./lessonGenerator";
import type { LessonContent, LessonRecord } from "./types";

const memoryLessons = new Map<string, LessonRecord>();

const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function toRecord(
  conceptId: string,
  content: LessonContent,
  id = crypto.randomUUID()
): LessonRecord {
  return {
    id,
    conceptId,
    content,
    createdAt: new Date().toISOString(),
  };
}

export async function getLessonByConcept(
  conceptId: string
): Promise<LessonRecord | null> {
  if (!isSupabaseConfigured) {
    return memoryLessons.get(conceptId) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("id, concept_id, content, created_at")
    .eq("concept_id", conceptId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    conceptId: data.concept_id,
    content: data.content as LessonContent,
    createdAt: data.created_at,
  };
}

export async function createLesson(
  conceptId: string,
  content: LessonContent
): Promise<LessonRecord> {
  if (!isSupabaseConfigured) {
    const record = toRecord(conceptId, content);
    memoryLessons.set(conceptId, record);
    return record;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .insert({ concept_id: conceptId, content })
    .select("id, concept_id, content, created_at")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Unable to create lesson.");
  }

  return {
    id: data.id,
    conceptId: data.concept_id,
    content: data.content as LessonContent,
    createdAt: data.created_at,
  };
}

export async function generateLesson(conceptId: string): Promise<LessonRecord> {
  const concept = concepts.find((item) => item.id === conceptId);
  if (!concept) {
    throw new Error("Unknown concept.");
  }

  const content = buildLessonContent(concept);
  return createLesson(conceptId, content);
}
