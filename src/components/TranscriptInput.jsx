import { useState } from 'react';

export default function TranscriptInput({ onSubmit, loading }) {
  const [transcript, setTranscript] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (transcript.trim()) onSubmit(transcript);
  }

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <label htmlFor="transcript" className="text-sm font-semibold text-zinc-300 tracking-wide">
          Transcript
        </label>
        {wordCount > 0 && (
          <span className="text-xs text-zinc-600">{wordCount.toLocaleString()} words</span>
        )}
      </div>
      <textarea
        id="transcript"
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        rows={20}
        placeholder="Paste your Zoom, Google Meet, or Teams transcript here…"
        className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-base leading-8 text-zinc-400 placeholder-zinc-700 transition-colors focus:border-zinc-700 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !transcript.trim()}
        className="flex items-center justify-center gap-2 rounded-lg bg-zinc-200 py-3 text-sm font-semibold text-black tracking-wide transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-25 cursor-pointer"
      >
        {loading ? (
          <>
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
            Processing…
          </>
        ) : (
          'Process Transcript'
        )}
      </button>
    </form>
  );
}
