"use client";

import { useRouter } from "next/navigation";
import NewThreadForm from "@/components/NewThreadForm";

export default function NewThreadPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-serif text-3xl font-bold text-journal-navy">Start a New Thread</h1>
      <p className="mt-2 font-sans text-sm text-journal-muted">
        Share your linguistic opinions, questions, or paper pitches with the community.
      </p>
      <div className="mt-8 border border-journal-parchment bg-white p-6 shadow-sm">
        <NewThreadForm onSuccess={(id) => router.push(`/forum/${id}`)} />
      </div>
    </div>
  );
}
