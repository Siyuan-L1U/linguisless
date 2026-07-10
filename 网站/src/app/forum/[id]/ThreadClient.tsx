"use client";

import { useRouter } from "next/navigation";
import ReplyForm from "@/components/ReplyForm";

interface ThreadClientProps {
  postId: string;
}

export default function ThreadClient({ postId }: ThreadClientProps) {
  const router = useRouter();

  return (
    <ReplyForm
      postId={postId}
      onSuccess={() => router.refresh()}
    />
  );
}
