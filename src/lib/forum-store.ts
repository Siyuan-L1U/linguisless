import fs from "fs";
import path from "path";
import { ForumPost, ForumReply, seedForumPosts } from "./forum";

const DATA_DIR = path.join(process.cwd(), "data");
const FORUM_FILE = path.join(DATA_DIR, "forum.json");

function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FORUM_FILE)) {
    fs.writeFileSync(FORUM_FILE, JSON.stringify(seedForumPosts, null, 2));
  }
}

export function getForumPosts(): ForumPost[] {
  ensureDataFile();
  const raw = fs.readFileSync(FORUM_FILE, "utf-8");
  return JSON.parse(raw) as ForumPost[];
}

export function saveForumPosts(posts: ForumPost[]): void {
  ensureDataFile();
  fs.writeFileSync(FORUM_FILE, JSON.stringify(posts, null, 2));
}

export function getForumPostById(id: string): ForumPost | undefined {
  return getForumPosts().find((p) => p.id === id);
}

export function addForumPost(post: Omit<ForumPost, "id" | "replies" | "views">): ForumPost {
  const posts = getForumPosts();
  const newPost: ForumPost = {
    ...post,
    id: Date.now().toString(),
    replies: [],
    views: 0,
  };
  posts.unshift(newPost);
  saveForumPosts(posts);
  return newPost;
}

export function addForumReply(
  postId: string,
  reply: Omit<ForumReply, "id">
): ForumReply | null {
  const posts = getForumPosts();
  const index = posts.findIndex((p) => p.id === postId);
  if (index === -1) return null;

  const newReply: ForumReply = {
    ...reply,
    id: `r${Date.now()}`,
  };
  posts[index].replies.push(newReply);
  saveForumPosts(posts);
  return newReply;
}

export function incrementViews(postId: string): void {
  const posts = getForumPosts();
  const post = posts.find((p) => p.id === postId);
  if (post) {
    post.views += 1;
    saveForumPosts(posts);
  }
}
