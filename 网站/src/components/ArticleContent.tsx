import type { ReactNode } from "react";

interface ArticleContentProps {
  content: string;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const sections = content.trim().split("\n\n");

  return (
    <div className="prose-journal font-serif text-journal-ink">
      {sections.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: string }) {
  const trimmed = block.trim();

  if (trimmed.startsWith("## ")) {
    return (
      <h2 className="mb-4 mt-8 font-serif text-xl font-bold text-journal-navy first:mt-0">
        {trimmed.slice(3)}
      </h2>
    );
  }

  if (trimmed.startsWith("> ")) {
    const lines = trimmed.split("\n").map((l) => l.replace(/^>\s?/, ""));
    return (
      <blockquote className="my-4 border-l-4 border-journal-burgundy bg-journal-parchment/50 py-3 pl-4 pr-2 font-serif italic text-journal-ink">
        {lines.map((line, i) => (
          <p key={i} className={i > 0 ? "mt-2" : ""}>
            {formatInline(line)}
          </p>
        ))}
      </blockquote>
    );
  }

  if (trimmed.startsWith("|")) {
    return <TableBlock content={trimmed} />;
  }

  return (
    <p className="mb-4 font-serif text-base leading-relaxed text-journal-ink">
      {formatInline(trimmed)}
    </p>
  );
}

function TableBlock({ content }: { content: string }) {
  const rows = content.split("\n").filter((r) => r.trim());
  const parseRow = (row: string) =>
    row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean);

  const headers = parseRow(rows[0]);
  const dataRows = rows.slice(2).map(parseRow);

  return (
    <TableWrapper>
      <table className="w-full border-collapse font-sans text-sm">
        <thead>
          <tr className="border-b-2 border-journal-navy bg-journal-parchment">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-2 text-left font-semibold text-journal-navy">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, ri) => (
            <tr key={ri} className="border-b border-journal-parchment">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2 text-journal-ink">
                  {formatInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}

function TableWrapper({ children }: { children: ReactNode }) {
  return <div className="my-6 overflow-x-auto">{children}</div>;
}

function formatInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}
