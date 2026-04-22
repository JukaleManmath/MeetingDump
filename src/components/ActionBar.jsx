import { useState } from 'react';
import { encodeSession } from '../utils/share';
import { MAX_SHARE_URL_BYTES } from '../config';

export default function ActionBar({ markdown }) {
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(markdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  }

  function handleShare() {
    const encoded = encodeSession(markdown);
    if (encoded.length > MAX_SHARE_URL_BYTES) {
      alert('Output too large to share via URL');
      return;
    }
    const url = `${window.location.origin}${window.location.pathname}?session=${encoded}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  function handleTweet() {
    const encoded = encodeSession(markdown);
    const shareUrl = `${window.location.origin}${window.location.pathname}?session=${encoded}`;
    const text = encodeURIComponent(`Just structured my meeting notes with MeetingDump ${shareUrl}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleCopy}
        className="text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300 cursor-pointer"
      >
        {copiedMarkdown ? 'Copied!' : 'Copy markdown'}
      </button>
      <span className="text-zinc-800">·</span>
      <button
        onClick={handleShare}
        className="text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300 cursor-pointer"
      >
        {copiedLink ? 'Link copied!' : 'Share link'}
      </button>
      <span className="text-zinc-800">·</span>
      <button
        onClick={handleTweet}
        className="text-xs text-zinc-500 underline underline-offset-2 transition-colors hover:text-zinc-300 cursor-pointer"
      >
        Tweet
      </button>
    </div>
  );
}
