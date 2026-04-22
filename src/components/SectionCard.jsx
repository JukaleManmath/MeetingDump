export default function SectionCard({ title, children }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900">
      {title && (
        <div className="border-b border-zinc-800 px-5 py-3">
          <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-500">{title}</h2>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
