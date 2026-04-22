import { useState } from 'react';

export default function ApiKeyInput({ onKeyChange }) {
  const [key, setKey] = useState(() => sessionStorage.getItem('groq_api_key') ?? '');
  const [visible, setVisible] = useState(false);

  const saved = key.trim() !== '' && key.trim() === sessionStorage.getItem('groq_api_key');

  function handleSave() {
    const trimmed = key.trim();
    if (!trimmed) return;
    sessionStorage.setItem('groq_api_key', trimmed);
    onKeyChange(trimmed);
  }

  function handleClear() {
    sessionStorage.removeItem('groq_api_key');
    setKey('');
    onKeyChange('');
  }

  if (saved) {
    return (
      <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-zinc-300">Groq API key saved</p>
          <p className="text-xs text-zinc-400">Clears when you close this tab</p>
        </div>
        <button
          onClick={handleClear}
          className="text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-red-400 cursor-pointer"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label htmlFor="api-key" className="block text-sm font-medium text-zinc-300">
          Groq API Key
        </label>
        <p className="mt-0.5 text-xs text-zinc-600">
          Stored in this tab's session only.{' '}
          <a href="https://console.groq.com" target="_blank" rel="noreferrer" className="text-zinc-400 underline underline-offset-2 hover:text-zinc-200 cursor-pointer">
            Get a free key
          </a>
        </p>
      </div>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            id="api-key"
            type={visible ? 'text' : 'password'}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            placeholder="gsk_..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2.5 pl-3.5 pr-10 text-base text-zinc-100 placeholder-zinc-600 transition-colors focus:border-zinc-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors hover:text-zinc-400 cursor-pointer"
            aria-label={visible ? 'Hide API key' : 'Show API key'}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        <button
          onClick={handleSave}
          disabled={!key.trim()}
          className="rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
