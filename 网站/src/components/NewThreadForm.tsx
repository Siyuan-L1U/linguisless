"use client";

import { useState } from "react";
import Link from "next/link";
import { forumCategories } from "@/lib/forum";

interface NewThreadFormProps {
  onSuccess?: (postId: string) => void;
}

export default function NewThreadForm({ onSuccess }: NewThreadFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("technical-linguistics");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, content, category }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create thread");
      }

      const post = await res.json();
      setTitle("");
      setAuthor("");
      setContent("");
      onSuccess?.(post.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-sans text-sm font-medium text-journal-navy">
          Thread Title
        </label>
        <input
          id="title"
          type="text"
          required
          minLength={5}
          maxLength={200}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full border border-journal-parchment bg-white px-3 py-2 font-sans text-sm focus:border-journal-navy focus:outline-none"
          placeholder="e.g., Is 'irregardless' a word?"
        />
      </div>

      <div>
        <label htmlFor="author" className="block font-sans text-sm font-medium text-journal-navy">
          Display Name
        </label>
        <input
          id="author"
          type="text"
          required
          minLength={2}
          maxLength={50}
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 w-full border border-journal-parchment bg-white px-3 py-2 font-sans text-sm focus:border-journal-navy focus:outline-none"
          placeholder="Your username"
        />
      </div>

      <div>
        <label htmlFor="category" className="block font-sans text-sm font-medium text-journal-navy">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full border border-journal-parchment bg-white px-3 py-2 font-sans text-sm focus:border-journal-navy focus:outline-none"
        >
          {forumCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block font-sans text-sm font-medium text-journal-navy">
          Content
        </label>
        <textarea
          id="content"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 w-full border border-journal-parchment bg-white px-3 py-2 font-sans text-sm focus:border-journal-navy focus:outline-none"
          placeholder="Share your linguistic hot take..."
        />
      </div>

      {error && <p className="font-sans text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-journal-navy px-6 py-2.5 font-sans text-sm font-medium uppercase tracking-wider text-journal-cream transition-colors hover:bg-journal-burgundy disabled:opacity-50"
      >
        {loading ? "Posting..." : "Create Thread"}
      </button>

      <p className="font-sans text-xs text-journal-muted">
        Be kind, be funny, don&apos;t be a prescriptivist about it.{" "}
        <Link href="/about" className="text-journal-burgundy hover:underline">
          Community guidelines
        </Link>
      </p>
    </form>
  );
}
