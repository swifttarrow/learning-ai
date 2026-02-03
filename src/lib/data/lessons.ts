import { createClient } from "@/lib/supabase/server";
import { generateConceptFromModel } from "@/lib/ai/conceptFromModel";
import { createConcept, getConceptById, getConcepts } from "./concepts";
import { generateLessonFromModel } from "@/lib/ai/lessonFromModel";
import type { Concept, LessonContent, LessonRecord } from "./types";

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

export async function generateLesson(
  conceptId?: string
): Promise<{ lesson: LessonRecord; concept: Concept }> {
  let concept = conceptId ? await getConceptById(conceptId) : null;

  if (!concept && conceptId) {
    throw new Error("Unknown concept.");
  }

  if (!concept) {
    const existing = await getConcepts();
    const generated = await generateConceptFromModel(existing);
    concept = await createConcept(generated);
  }

  const content = await generateLessonFromModel(concept);
  const lesson = await createLesson(concept.id, content);
  return { lesson, concept };
}

export async function getLatestLessons(
  limit = 3
): Promise<Array<{ lesson: LessonRecord; conceptTitle: string }>> {
  if (!isSupabaseConfigured) {
    const lessons = Array.from(memoryLessons.values()).sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
    const latest = lessons.slice(0, limit);
    const results = await Promise.all(
      latest.map(async (lesson) => {
        const concept = await getConceptById(lesson.conceptId);
        return {
          lesson,
          conceptTitle: concept?.title ?? lesson.content.title,
        };
      })
    );
    return results;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("id, concept_id, content, created_at, concepts(title)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map((row) => ({
    lesson: {
      id: row.id,
      conceptId: row.concept_id,
      content: row.content as LessonContent,
      createdAt: row.created_at,
    },
    conceptTitle:
      row.concepts?.title ?? (row.content as LessonContent)?.title ?? "Lesson",
  }));
}
