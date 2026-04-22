import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function OutputPanel({ markdown, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
          <span className="text-xs font-medium text-zinc-600 tracking-wide">Generating…</span>
        </div>
        <div className="space-y-3">
          <div className="h-3 w-1/3 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-800" />
          <div className="mt-6 h-3 w-1/4 animate-pulse rounded bg-zinc-800" />
          <div className="h-12 w-full animate-pulse rounded bg-zinc-800" />
          <div className="mt-6 h-3 w-1/3 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="prose prose-sm prose-invert max-w-none
      prose-headings:font-semibold prose-headings:text-zinc-100 prose-headings:text-lg
      prose-headings:border-b prose-headings:border-zinc-800 prose-headings:pb-2 prose-headings:mb-4
      prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-base
      prose-li:text-zinc-300 prose-li:leading-relaxed prose-li:text-base
      prose-strong:text-zinc-100 prose-strong:font-semibold
      prose-table:text-sm prose-table:w-full
      prose-th:text-zinc-200 prose-th:bg-zinc-900 prose-th:font-medium prose-th:px-3 prose-th:py-2
      prose-td:text-zinc-300 prose-td:border-zinc-800 prose-td:px-3 prose-td:py-2
      prose-hr:border-zinc-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
