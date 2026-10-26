<p align="center">
	<img src="public/product-spotlight-logo.svg" alt="HookPage logo" width="96" height="96">
</p>

# HookPage

Turn rough indie game notes into itch.io-ready copy. HookPage uses Gemini to draft a hook, short pitch, full description, feature bullets, developer note, and call to action, then gives each result a shareable preview page.

## What it does

- Generates game listing copy tailored to itch.io's informal indie-game culture.
- Creates a shareable `/p/[slug]` preview with one-click copy controls.
- Stores previews in Redis when `REDIS_URL` is configured.
- Uses an in-memory store for local development without Redis.

## Tech stack

Next.js, React, Tailwind CSS, Google Gemini, Node Redis, and nanoid.

## Getting started

Use Node.js 20.9 or newer, then install dependencies:

```sh
npm install
```

Add a root `.env` file:

```dotenv
GEMINI_API_KEY=your-google-ai-studio-api-key
GEMINI_MODEL=gemini-2.5-flash
SITE_URL=https://your-production-domain.example
```

Run the app and checks:

```sh
npm run dev
npm run test:ai
npm run lint
npm run build
```

