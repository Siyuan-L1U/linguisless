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

export const seedForumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Is 'irregardless' a word? A thread that will never end",
    author: "PrescriptivistRecovering",
    content:
      "I've been in recovery for 3 years but someone just said 'irregardless' in a meeting and I felt a disturbance in the Force. Is there a support group for this?",
    category: "general",
    createdAt: "2026-03-10T14:30:00Z",
    views: 1842,
    pinned: true,
    replies: [
      {
        id: "r1",
        author: "DescriptivistDawn",
        content:
          "Yes, it's a word. It's in dictionaries. Your recovery is about accepting that speakers get to decide, not dictionaries.",
        createdAt: "2026-03-10T15:00:00Z",
      },
      {
        id: "r2",
        author: "EtymologyNerd",
        content:
          "Fun fact: 'irregardless' has been attested since the 1700s. We've been having this argument for 300 years. The argument is the tradition now.",
        createdAt: "2026-03-10T16:22:00Z",
      },
      {
        id: "r3",
        author: "ChomskyFan42",
        content: "Irregardless, the deep structure is still 'regardless.' Fight me.",
        createdAt: "2026-03-11T09:15:00Z",
      },
    ],
  },
  {
    id: "2",
    title: "What's the most cursed minimal pair you've ever encountered?",
    author: "PhonologyPhan",
    content:
      "I'll start: 'cot' vs 'caught' for speakers who merge them, but their grandmother doesn't. Thanksgiving dinner becomes a field methods session.",
    category: "phonology",
    createdAt: "2026-03-08T11:00:00Z",
    views: 956,
    replies: [
      {
        id: "r4",
        author: "IPA_sufferer",
        content: "English vowels. That's the pair. All of them. Against all of the other ones.",
        createdAt: "2026-03-08T12:30:00Z",
      },
    ],
  },
  {
    id: "3",
    title: "Paper idea: The syntax of 'no worries' as a speech act of false reassurance",
    author: "PragmaticsPunk",
    content:
      "Hear me out. When Australians say 'no worries' they are simultaneously performing reassurance, dismissing your concern, and asserting cultural superiority. I need co-authors and a grant.",
    category: "submissions",
    createdAt: "2026-03-05T08:45:00Z",
    views: 423,
    replies: [],
  },
  {
    id: "4",
    title: "Why does every language have a word for 'mother' but not for 'minimal pair'?",
    author: "TypologyTurtle",
    content:
      "Maternal terms are near-universal. Technical linguistics terms are not. Coincidence? I think not. Discuss.",
    category: "general",
    createdAt: "2026-03-01T19:20:00Z",
    views: 678,
    replies: [
      {
        id: "r5",
        author: "FieldWorker99",
        content: "Have you tried asking a non-linguist what a minimal pair is? The blank stare is universal too.",
        createdAt: "2026-03-02T10:00:00Z",
      },
    ],
  },
  {
    id: "5",
    title: "My advisor said my tree diagram 'lacks commitment'",
    author: "GradStudentTears",
    content:
      "I drew the NP branching left instead of right and now I'm questioning my entire career. Is there a right way to draw trees or is it all aesthetic?",
    category: "syntax",
    createdAt: "2026-02-28T23:59:00Z",
    views: 1203,
    replies: [
      {
        id: "r6",
        author: "TreeSurgeon",
        content: "The branches should reflect your theoretical commitments. Left-branching NP suggests you're still figuring things out. We've all been there.",
        createdAt: "2026-03-01T08:00:00Z",
      },
    ],
  },
];
