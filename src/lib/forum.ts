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

export const forumCategories = [
  { id: "general", name: "General Linguistics", description: "Open discussion on all things linguistic" },
  { id: "syntax", name: "Syntax Corner", description: "Trees, movement, and bracket obsession" },
  { id: "phonology", name: "Phonology & Phonetics", description: "IPA nightmares and voicing debates" },
  { id: "sociolinguistics", name: "Sociolinguistics", description: "Language, society, and why your aunt says 'supposably'" },
  { id: "off-topic", name: "Off-Topic", description: "Not linguistics, but we're not strict about definitions anyway" },
  { id: "submissions", name: "Submission Ideas", description: "Pitch your next Linguisless paper" },
];
