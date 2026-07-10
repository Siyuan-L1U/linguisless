export interface ForumPost {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  createdAt: string;
  replies: ForumReply[];
  views: number;
  pinned?: boolean;
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export const allThreadsCategory = {
  id: "all",
  name: "All Threads",
  description: "Everything, everywhere, all at once.",
};

export const forumCategories = [
  {
    id: "technical-linguistics",
    name: "Things That Are Technically Linguistics",
    description: "Any topic that can be defended with enough theoretical confidence.",
  },
  {
    id: "corpus-computational",
    name: "Corpus & Computational Chaos",
    description:
      "Corpora, NLP, scraping, annotation, pipelines, broken regex, and CSV-induced suffering.",
  },
  {
    id: "discourse-pragmatics",
    name: "Discourse, Pragmatics & Vibes",
    description:
      "Meaning, interaction, silence, “ok”, memes, internet language, and emotional punctuation.",
  },
  {
    id: "fieldwork-trauma",
    name: "Fieldwork & Academic Trauma",
    description:
      "Reviewer stories, conference disasters, annotation pain, methodology crises, and survival strategies.",
  },
  {
    id: "half-formed-ideas",
    name: "Half-Formed Research Ideas",
    description: "Ideas posted before they become papers, grants, or regrettable life decisions.",
  },
  {
    id: "specific-observations",
    name: "Unnecessarily Specific Observations",
    description:
      "“Has anyone noticed…” type phenomena that somehow require 40 pages and mixed methods.",
  },
  {
    id: "theory-inflation",
    name: "Theory Inflation Zone",
    description: "Extremely ambitious frameworks built on dangerously small datasets.",
  },
  {
    id: "off-topic",
    name: "Off Topic (Still Somehow About Language)",
    description: "Officially off-topic. Unofficially still discourse analysis.",
  },
];

const legacyCategoryMap: Record<string, string> = {
  general: "technical-linguistics",
  syntax: "technical-linguistics",
  phonology: "technical-linguistics",
  sociolinguistics: "discourse-pragmatics",
  submissions: "half-formed-ideas",
};

export function resolveCategoryId(id: string): string {
  return legacyCategoryMap[id] ?? id;
}

export function getCategoryById(id: string) {
  const resolvedId = resolveCategoryId(id);
  return forumCategories.find((c) => c.id === resolvedId);
}

export function getCategoryName(id: string): string {
  return getCategoryById(id)?.name ?? id;
}

export function getContentPreview(content: string, maxLength = 30): string {
  const trimmed = content.trim();
  if (!trimmed) return "";

  const firstSentence = trimmed.split(/(?<=[.!?])\s+|\n/)[0] ?? trimmed;
  if (firstSentence.length <= maxLength) return firstSentence;

  return `${firstSentence.slice(0, maxLength)}…`;
}
