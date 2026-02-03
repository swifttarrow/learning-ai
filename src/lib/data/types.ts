export type ConceptLink = {
  title: string;
  url: string;
};

export type Concept = {
  id: string;
  title: string;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  prereqs: string[];
  canonicalLinks?: ConceptLink[];
};

export type LessonContent = {
  title: string;
  why_it_matters: string;
  core_explanation: string[];
  examples: string[];
  common_pitfalls: string[];
  exercises: string[];
  links: ConceptLink[];
  next_concepts: string[];
};

export type LessonRecord = {
  id: string;
  conceptId: string;
  content: LessonContent;
  createdAt: string;
};

export type NewsSummaryContent = {
  headline: string;
  what_happened: string[];
  why_it_matters_for_builders: string[];
  tags: string[];
};

export type NewsSummaryRecord = {
  id: string;
  newsItemId: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: NewsSummaryContent;
};
