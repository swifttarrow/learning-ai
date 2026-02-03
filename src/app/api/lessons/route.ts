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
  try {
    const body = await request.json();
    const conceptId = body?.conceptId as string | undefined;
    const content = body?.content;

    if (!content && !process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not set on the server." },
        { status: 500 }
      );
    }

    if (content && !conceptId) {
      return NextResponse.json(
        { error: "conceptId is required when supplying content." },
        { status: 400 }
      );
    }

    const result = content
      ? await createLesson(conceptId as string, content)
      : await generateLesson(conceptId);

    if ("lesson" in result) {
      return NextResponse.json({ lesson: result.lesson, concept: result.concept });
    }

    return NextResponse.json({ lesson: result });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
