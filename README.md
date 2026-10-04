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
```

`.env` is ignored by Git. Keep the API key private and do not commit this file.

## Commands

```sh
npm run dev
npm run test:ai
npm run lint
npm run build
```

The form submits to `/api/generate`. Successful generations redirect to `/p/[slug]`, where each copy section can be copied separately.

## Storage

Preview data currently lives in a process-local in-memory `Map`. Links work only while the generating server process retains that data; restarts, serverless execution, and multiple server instances require persistent storage.
