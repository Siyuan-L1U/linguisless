import { NextResponse } from "next/server";
import { addForumReply, getForumPostById } from "@/lib/forum-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const post = await getForumPostById(id);

    if (!post) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    const body = await request.json();
    const { author, content } = body;

    if (!author?.trim() || !content?.trim()) {
      return NextResponse.json({ error: "Author and content are required" }, { status: 400 });
    }

    const reply = await addForumReply(id, {
      author: author.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    });

    if (!reply) {
      return NextResponse.json({ error: "Failed to add reply" }, { status: 500 });
    }

    return NextResponse.json(reply, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
