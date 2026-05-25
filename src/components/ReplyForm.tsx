"use client";

import { useState } from "react";

interface ReplyFormProps {
  postId: string;
  onSuccess?: () => void;
}

export default function ReplyForm({ postId, onSuccess }: ReplyFormProps) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/forum/${postId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, content }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to post reply");
      }

      setAuthor("");
      setContent("");
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-t border-journal-parchment pt-6">
      <h3 className="font-serif text-lg font-bold text-journal-navy">Post a Reply</h3>
      <div className="mt-4 space-y-3">
        <input
          type="text"
          required
          minLength={2}
          maxLength={50}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Display name"
          className="w-full border border-journal-parchment bg-white px-3 py-2 font-sans text-sm focus:border-journal-navy focus:outline-none"
        />
        <textarea
          required
          minLength={5}
          maxLength={3000}
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your reply..."
          className="w-full border border-journal-parchment bg-white px-3 py-2 font-sans text-sm focus:border-journal-navy focus:outline-none"
        />
      </div>
      {error && <p className="mt-2 font-sans text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-3 bg-journal-burgundy px-5 py-2 font-sans text-sm font-medium text-white hover:bg-journal-navy disabled:opacity-50"
      >
        {loading ? "Posting..." : "Reply"}
      </button>
    </form>
  );
}
