import { NextResponse } from "next/server";
import { addForumPost, getForumPosts } from "@/lib/forum-store";
import { forumCategories } from "@/lib/forum";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let posts = await getForumPosts();

  if (category && category !== "all") {
    posts = posts.filter((p) => p.category === category);
  }

  posts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, author, content, category } = body;

    if (!title?.trim() || !author?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const validCategory = forumCategories.some((c) => c.id === category);
    if (!validCategory) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const post = await addForumPost({
      title: title.trim(),
      author: author.trim(),
      content: content.trim(),
      category,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
