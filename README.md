# Product Spotlight Generator

A Next.js app that uses Gemini to draft itch.io game copy and render a shareable preview.

## Requirements

- Node.js 20.9 or newer
- A Google AI Studio API key

## Setup

Install dependencies:

```sh
npm install
```

Create a root `.env` file and add your key:

```dotenv
GEMINI_API_KEY=your-google-ai-studio-api-key
GEMINI_MODEL=gemini-2.5-flash
UPSTASH_REDIS_REST_URL=your-upstash-rest-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-rest-token
```

The two Upstash settings are optional as a pair. If either is configured, both are required. `.env` is ignored by Git; keep all keys private and do not commit this file.

## Commands

```sh
npm run dev
npm run test:ai
npm run lint
npm run build
```

The form submits to `/api/generate`. Successful generations redirect to `/p/[slug]`, where each copy section can be copied separately.

## Storage

When both Upstash settings are present, preview data is stored in Redis and can be revisited across server restarts. Without them, local development uses a process-local in-memory `Map`; those links are temporary and do not work across restarts or multiple server instances.
