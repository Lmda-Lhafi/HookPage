import { Redis } from '@upstash/redis'
import type { SpotlightCopy } from '@/lib/ai'

export type SpotlightPage = SpotlightCopy & {
  slug: string
  productName: string
  genre: string
  rawDescription: string
  coverImageUrl: string
}

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

if ((redisUrl && !redisToken) || (!redisUrl && redisToken)) {
  throw new Error('Both UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be configured.')
}

const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : undefined

const globalForSpotlight = globalThis as typeof globalThis & {
  spotlightPages?: Map<string, SpotlightPage>
}

const pages = (globalForSpotlight.spotlightPages ??= new Map<string, SpotlightPage>())

export async function savePage(page: SpotlightPage): Promise<void> {
  if (redis) {
    await redis.set(page.slug, page)
    return
  }

  pages.set(page.slug, page)
}

export async function getPage(slug: string): Promise<SpotlightPage | undefined> {
  if (redis) {
    return (await redis.get<SpotlightPage>(slug)) ?? undefined
  }

  return pages.get(slug)
}