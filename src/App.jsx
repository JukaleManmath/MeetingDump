import { useState } from 'react';
import TranscriptInput from './components/TranscriptInput';
import OutputPanel from './components/OutputPanel';
import ActionBar from './components/ActionBar';
import ApiKeyInput from './components/ApiKeyInput';
import { useGroq } from './hooks/useGroq';
import { decodeSession } from './utils/share';

const SECTIONS = [
  {
    label: 'Decisions Made',
    desc: 'Everything agreed or concluded during the meeting, as a clear bullet list.',
  },
  {
    label: 'Action Items',
    desc: 'A table of tasks with owner and due date, ready to paste into Notion.',
  },
  {
    label: 'Open Questions',
    desc: 'Unresolved items and open debates that still need a follow-up.',
  },
  {
    label: 'Key Topics',
    desc: 'High-level themes and subjects discussed throughout the meeting.',
  },
];

export default function App() {
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem('groq_api_key') ?? '');
  const [sharedOutput] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const session = params.get('session');
    return session ? decodeSession(session) : '';
  });

  const { processTranscript, loading, error, result } = useGroq(apiKey);

  const displayOutput = result || sharedOutput;

  return (
    <div className="relative min-h-screen bg-black text-zinc-100 dot-grid overflow-x-hidden">
      <div className="glow-top" />

      <div className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-8 pt-20 pb-16 text-center">
          <p className="mb-5 inline-block rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1 text-sm font-medium tracking-widest text-zinc-500 uppercase">
            Powered by Groq · Llama 3.3 70B
          </p>
          <h1 className="gradient-text text-5xl font-bold tracking-tight leading-tight md:text-6xl">
            Meeting transcripts,<br />structured instantly.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-500 leading-relaxed">
            Paste any raw Zoom, Meet, or Teams transcript. MeetingDump extracts and formats everything into a Notion-importable markdown page in <span className="font-bold text-zinc-300">one click</span>, no backend, no cost.
          </p>

          {/* Section preview cards */}
          <div className="mt-12 grid grid-cols-2 gap-3 text-left md:grid-cols-4">
            {SECTIONS.map((s) => (
              <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-sm">
                <p className="text-sm font-semibold text-zinc-200 mb-2">{s.label}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto max-w-5xl px-8">
          <div className="border-t border-zinc-800" />
        </div>

        {/* App */}
        <main className="mx-auto max-w-5xl px-8 py-12 flex flex-col gap-8">
          <ApiKeyInput onKeyChange={setApiKey} />

          <div className="card-glow rounded-xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-sm">
            <TranscriptInput onSubmit={processTranscript} loading={loading} />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          {(displayOutput || loading) && (
            <div className="flex flex-col gap-3">
              <div className="card-glow rounded-xl border border-zinc-800 bg-zinc-950/80 p-6 backdrop-blur-sm">
                <OutputPanel markdown={displayOutput} loading={loading} />
              </div>
              {displayOutput && !loading && <ActionBar markdown={displayOutput} />}
            </div>
          )}
        </main>

        <footer className="border-t border-zinc-900 py-8 text-center">
          <p className="text-xs text-zinc-700">No backend. No database. Runs entirely in your browser.</p>
        </footer>
      </div>
    </div>
  );
}
