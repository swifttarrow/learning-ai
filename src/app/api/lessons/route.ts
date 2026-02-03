import { NextResponse } from "next/server";
import { createLesson, generateLesson, getLessonByConcept } from "@/lib/data/lessons";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const conceptId = searchParams.get("conceptId");

  if (!conceptId) {
    return NextResponse.json(
      { error: "conceptId is required" },
      { status: 400 }
    );
  }

  const lesson = await getLessonByConcept(conceptId);
  return NextResponse.json({ lesson });
}

export async function POST(request: Request) {
  const body = await request.json();
  const conceptId = body?.conceptId as string | undefined;
  const content = body?.content;

  if (!conceptId) {
    return NextResponse.json(
      { error: "conceptId is required" },
      { status: 400 }
    );
  }

  const lesson = content
    ? await createLesson(conceptId, content)
    : await generateLesson(conceptId);
  return NextResponse.json({ lesson });
}
