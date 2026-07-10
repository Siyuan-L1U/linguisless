export interface Author {
  name: string;
  affiliation: string;
  email?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  authors: Author[];
  abstract: string;
  keywords: string[];
  volume: number;
  issue: number;
  year: number;
  pages: string;
  doi: string;
  received: string;
  accepted: string;
  published: string;
  category: string;
  content: string;
  featured?: boolean;
}

export interface Issue {
  volume: number;
  issue: number;
  year: number;
  title: string;
  description: string;
  published: string;
  coverImage?: string;
}

export const journalInfo = {
  name: "Linguisless",
  fullName: "Linguisless: A Journal of Linguistics, Probably",
  subtitle: "A Journal of Linguistics, Probably",
  issn: "2353-9595",
  nssn: "2353-9595",
  publisher: "Web of Nothing",
  webOfNothingUrl: "https://webofnothing.org/journal/Linguisless.html",
  founded: 2026,
  impactFactor: "0.000",
  tagline: "Published Everywhere. Peer-reviewed-ish.",
  description:
    "Linguisless is dedicated to all unserious research concerning language. We maintain the aesthetic standards of a top-tier journal while proudly rejecting their methodological ones.",
  submitEmail: "linguisless@gmail.com",
  editorialEmail: "linguisless@gmail.com",
};

export const editorialBoard = [
  {
    role: "Editor-in-Chief",
    name: "Dr. Spicy Chicken Wing",
    affiliation: "Linguisless Editorial Office",
  },
  {
    role: "Associate Editor",
    name: "Dr. Bazinga Klingon",
    affiliation: "Linguisless Editorial Office",
  },
];

export const issues: Issue[] = [
  {
    volume: 0,
    issue: 0,
    year: 2026,
    title: "Inaugural Issue",
    description:
      "The founding issue of Linguisless. History was made. Possibly by accident. Indexed on Web of Nothing.",
    published: "July 2026",
    coverImage: "/covers/vol-0-issue-0-cover.png",
  },
];

export const articles: Article[] = [];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByIssue(volume: number, issue: number): Article[] {
  return articles.filter((a) => a.volume === volume && a.issue === issue);
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}
