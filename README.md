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
REDIS_URL=rediss://your-redis-connection-url
```

`REDIS_URL` is optional for local development, where the app uses an in-memory fallback. Production deployments require it for shareable previews. Connect a Redis database to the Vercel project and add its connection URL to the deployment environment. `.env` is ignored by Git; keep all keys private and do not commit this file.

## Commands

```sh
npm run dev
npm run test:ai
npm run lint
npm run build
```

The form submits to `/api/generate`. Successful generations redirect to `/p/[slug]`, where each copy section can be copied separately.

## Storage

When `REDIS_URL` is present, preview data is stored in Redis and can be revisited across server restarts. Without it, local development uses a process-local in-memory `Map`; those links are temporary and do not work across restarts or multiple server instances.
