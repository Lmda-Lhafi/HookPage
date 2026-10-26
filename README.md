<p align="center">
	<img src="public/product-spotlight-logo.svg" alt="Product Spotlight logo" width="96" height="96">
</p>

# Product Spotlight

Turn rough indie game notes into itch.io-ready copy. Product Spotlight uses Gemini to draft a hook, short pitch, full description, feature bullets, developer note, and call to action, then gives each result a shareable preview page.

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
REDIS_URL=rediss://your-redis-connection-url
SITE_URL=https://your-production-domain.example
```

`REDIS_URL` is optional for local development but required for previews on Vercel. `SITE_URL` should be your production origin; on Vercel, the production host is used as a fallback. `.env` is ignored by Git. Never commit API keys or database credentials.

Run the app and checks:

```sh
npm run dev
npm run test:ai
npm run lint
npm run build
```

## Storage note

Without Redis, the local in-memory store is temporary: preview URLs stop working after a process restart and are not shared between serverless functions. Configure `REDIS_URL` in the Vercel project for persistent shareable previews.

## Search indexing

The app exposes a sitemap and robots policy, and sets canonical and social metadata. Set `SITE_URL` to the public production domain, then add the domain to Google Search Console and submit `/sitemap.xml`. Indexing and search position depend on Google's crawling and ranking systems; no project can guarantee a first-place result.
