import fs from "fs";
import path from "path";
import { ForumPost, ForumReply } from "./forum";

const LOCAL_FILE = path.join(process.cwd(), "data", "forum.json");
const VERCEL_FILE = path.join("/tmp", "linguisless-forum.json");

function getWritablePath(): string {
  return process.env.VERCEL ? VERCEL_FILE : LOCAL_FILE;
}

function readBundledPosts(): ForumPost[] {
  try {
    if (fs.existsSync(LOCAL_FILE)) {
      const raw = fs.readFileSync(LOCAL_FILE, "utf-8");
      const parsed = JSON.parse(raw) as ForumPost[];
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    // fall through
  }
  return [];
}

function readPosts(): ForumPost[] {
  const writablePath = getWritablePath();

  if (writablePath !== LOCAL_FILE) {
    try {
      if (fs.existsSync(writablePath)) {
        const raw = fs.readFileSync(writablePath, "utf-8");
        const parsed = JSON.parse(raw) as ForumPost[];
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // fall through to bundled data
    }
  }

  return readBundledPosts();
}

function writePosts(posts: ForumPost[]): void {
  const filePath = getWritablePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  } catch (error) {
    console.error("Failed to save forum posts:", error);
    throw new Error("Forum storage unavailable");
  }
}

export function getForumPosts(): ForumPost[] {
  return readPosts();
}

export function saveForumPosts(posts: ForumPost[]): void {
  writePosts(posts);
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
  try {
    const posts = getForumPosts();
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.views += 1;
      saveForumPosts(posts);
    }
  } catch {
    // View counts are non-critical if storage is unavailable
  }
}
