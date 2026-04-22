# MeetingDump

Paste any meeting transcript. Get a structured Notion page in one click.

MeetingDump uses Groq's free Llama 3.3 70B API to extract four structured sections from raw Zoom/Meet/Teams transcripts and formats the output as Notion-importable markdown — with copy-to-clipboard, tweet, and shareable URL built in.

---

## Demo



https://github.com/user-attachments/assets/2425141b-3298-4a31-95ba-13fae5107d74



---

## The Problem

Every team using Notion spends 10+ minutes after each meeting manually extracting decisions, action items, owners, and open questions from a raw transcript and formatting them into a Notion page. This is pure repetitive labour. MeetingDump automates it entirely with zero infrastructure cost.

---

## What It Does

1. User enters their Groq API key (stored in browser session only — never persisted)
2. User pastes a raw meeting transcript into the text area
3. Groq API (Llama 3.3 70B) processes the transcript client-side with streaming output
4. Output is structured into four sections:
   - **Decisions Made** — everything that was agreed or concluded
   - **Action Items** — task description + owner + due date (table format)
   - **Open Questions** — unresolved items that need follow-up
   - **Key Topics** — high-level themes discussed in the meeting
5. Output renders as Notion-importable markdown
6. One-click copy, tweet, and shareable URL per session

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 18 + Vite |
| Styling | TailwindCSS |
| LLM | Groq API — Llama 3.3 70B (free tier, 14,400 req/day) |
| Markdown Rendering | react-markdown + remark-gfm |
| Session Sharing | URL params (base64-encoded output, no backend) |
| Deployment | Vercel (free tier) |

No backend. No database. No server costs. Runs entirely in the browser.

---

## Project Structure

```
meetingdump/
├── src/
│   ├── components/
│   │   ├── ApiKeyInput.jsx        # API key input with show/hide + session storage
│   │   ├── TranscriptInput.jsx    # textarea + submit button
│   │   ├── OutputPanel.jsx        # rendered markdown output with skeleton loading
│   │   ├── ActionBar.jsx          # copy, tweet, share buttons
│   │   └── SectionCard.jsx        # reusable section wrapper card
│   ├── hooks/
│   │   └── useGroq.js             # Groq API call + streaming logic
│   ├── utils/
│   │   ├── prompt.js              # system prompt construction
│   │   └── share.js               # URL encode/decode session state
│   ├── config.js                  # model name + URL size constants
│   ├── App.jsx
│   └── main.jsx
├── demo_video/
│   └── demo.mov
├── .env.example
└── README.md
```

---

## Local Setup

### Prerequisites

- Node.js 18+
- A free Groq API key from [console.groq.com](https://console.groq.com) (no credit card required)

### Steps

```bash
# Clone the repo
git clone https://github.com/your-username/meetingdump.git
cd meetingdump

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open `http://localhost:5173`, enter your Groq API key in the UI, and paste a transcript.

### Environment Variables

No environment variables are required. Users supply their own Groq API key at runtime via the UI. The key is stored in `sessionStorage` and cleared when the tab is closed.

---

## API Key Security

The Groq API key is **never hardcoded or bundled** into the app. Users enter it directly in the browser:

- Stored in `sessionStorage` only (not `localStorage`) — cleared on tab close
- Never sent to any server other than `api.groq.com` directly
- A "Remove" button lets users clear it at any time

Groq's free tier has no billing attached, so even if a key were exposed, it can only consume the daily request quota.

---

## Deployment (Vercel)

```bash
npm i -g vercel
vercel --prod
```

No environment variables needed in Vercel — API keys are user-supplied at runtime.

---

## Groq API — Free Tier Details

| Parameter | Value |
|---|---|
| Model | `llama-3.3-70b-versatile` |
| Requests/day | 14,400 |
| Tokens/minute | 6,000 |
| Credit card required | No |

---

## How Sessions Are Shared

Each processed transcript is base64-encoded and appended to the URL as `?session=...`. Opening a shared URL re-hydrates the output panel client-side. If the encoded output exceeds 8KB, a warning is shown instead. No data is stored server-side.

---

## Prompt Design

The system prompt instructs Llama 3.3 to:
- Output only valid markdown, no preamble
- Use `##` headers for each section
- Format action items as a markdown table with `| Task | Owner | Due Date |` columns
- Infer due dates from relative references ("by Friday", "next week") or mark as `TBD`
- Never hallucinate — if information is absent, output `None identified`

---

## Roadmap (Phase 2+)

- Direct Notion API integration — push output as a new Notion page with one click
- Slack integration — post the structured summary to a channel
- Audio file upload — transcribe via Whisper then process
- Template selection — different extraction schemas for standups, retrospectives, planning sessions
