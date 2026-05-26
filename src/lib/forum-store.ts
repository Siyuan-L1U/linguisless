import fs from "fs";
import path from "path";
import { ForumPost, ForumReply } from "./forum";
import { createAdminClient, isSupabaseConfigured } from "./supabase/admin";

const LOCAL_FILE = path.join(process.cwd(), "data", "forum.json");
const VERCEL_FILE = path.join("/tmp", "linguisless-forum.json");

type DbPost = {
  id: string;
  title: string;
  author: string;
  content: string;
  category: string;
  created_at: string;
  views: number;
  pinned: boolean;
};

type DbReply = {
  id: string;
  post_id: string;
  author: string;
  content: string;
  created_at: string;
};

function mapReply(row: DbReply): ForumReply {
  return {
    id: row.id,
    author: row.author,
    content: row.content,
    createdAt: row.created_at,
  };
}

function mapPost(row: DbPost, replies: ForumReply[]): ForumPost {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    content: row.content,
    category: row.category,
    createdAt: row.created_at,
    views: row.views,
    pinned: row.pinned,
    replies,
  };
}

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

function readFilePosts(): ForumPost[] {
  const writablePath = getWritablePath();

  if (writablePath !== LOCAL_FILE) {
    try {
      if (fs.existsSync(writablePath)) {
        const raw = fs.readFileSync(writablePath, "utf-8");
        const parsed = JSON.parse(raw) as ForumPost[];
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      // fall through
    }
  }

  return readBundledPosts();
}

function writeFilePosts(posts: ForumPost[]): void {
  const filePath = getWritablePath();
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}

async function getSupabasePosts(): Promise<ForumPost[]> {
  const supabase = createAdminClient();

  const { data: posts, error: postsError } = await supabase
    .from("forum_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (postsError) throw postsError;

  const { data: replies, error: repliesError } = await supabase
    .from("forum_replies")
    .select("*")
    .order("created_at", { ascending: true });

  if (repliesError) throw repliesError;

  const repliesByPost = new Map<string, ForumReply[]>();
  for (const row of (replies ?? []) as DbReply[]) {
    const list = repliesByPost.get(row.post_id) ?? [];
    list.push(mapReply(row));
    repliesByPost.set(row.post_id, list);
  }

  return ((posts ?? []) as DbPost[]).map((post) =>
    mapPost(post, repliesByPost.get(post.id) ?? [])
  );
}

async function getSupabasePostById(id: string): Promise<ForumPost | undefined> {
  const supabase = createAdminClient();

  const { data: post, error: postError } = await supabase
    .from("forum_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (postError) throw postError;
  if (!post) return undefined;

  const { data: replies, error: repliesError } = await supabase
    .from("forum_replies")
    .select("*")
    .eq("post_id", id)
    .order("created_at", { ascending: true });

  if (repliesError) throw repliesError;

  return mapPost(post as DbPost, ((replies ?? []) as DbReply[]).map(mapReply));
}

function newId(prefix = ""): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}${crypto.randomUUID()}`;
  }
  return `${prefix}${Date.now()}`;
}

export async function getForumPosts(): Promise<ForumPost[]> {
  if (isSupabaseConfigured()) {
    return getSupabasePosts();
  }
  return readFilePosts();
}

export async function getForumPostById(id: string): Promise<ForumPost | undefined> {
  if (isSupabaseConfigured()) {
    return getSupabasePostById(id);
  }
  return readFilePosts().find((p) => p.id === id);
}

export async function addForumPost(
  post: Omit<ForumPost, "id" | "replies" | "views">
): Promise<ForumPost> {
  const newPost: ForumPost = {
    ...post,
    id: newId(),
    replies: [],
    views: 0,
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("forum_posts").insert({
      id: newPost.id,
      title: newPost.title,
      author: newPost.author,
      content: newPost.content,
      category: newPost.category,
      created_at: newPost.createdAt,
      views: 0,
      pinned: false,
    });

    if (error) throw error;
    return newPost;
  }

  const posts = readFilePosts();
  posts.unshift(newPost);
  writeFilePosts(posts);
  return newPost;
}

export async function addForumReply(
  postId: string,
  reply: Omit<ForumReply, "id">
): Promise<ForumReply | null> {
  const newReply: ForumReply = {
    ...reply,
    id: newId("r"),
  };

  if (isSupabaseConfigured()) {
    const supabase = createAdminClient();
    const { error } = await supabase.from("forum_replies").insert({
      id: newReply.id,
      post_id: postId,
      author: newReply.author,
      content: newReply.content,
      created_at: newReply.createdAt,
    });

    if (error) throw error;
    return newReply;
  }

  const posts = readFilePosts();
  const index = posts.findIndex((p) => p.id === postId);
  if (index === -1) return null;

  posts[index].replies.push(newReply);
  writeFilePosts(posts);
  return newReply;
}

export async function incrementViews(postId: string): Promise<void> {
  try {
    if (isSupabaseConfigured()) {
      const supabase = createAdminClient();
      const post = await getSupabasePostById(postId);
      if (!post) return;

      await supabase
        .from("forum_posts")
        .update({ views: post.views + 1 })
        .eq("id", postId);
      return;
    }

    const posts = readFilePosts();
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.views += 1;
      writeFilePosts(posts);
    }
  } catch {
    // View counts are non-critical
  }
}
