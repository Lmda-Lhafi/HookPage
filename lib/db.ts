import { createClient, type RedisClientType } from 'redis'
import type { SpotlightCopy } from '@/lib/ai'

export type SpotlightPage = SpotlightCopy & {
  slug: string
  productName: string
  genre: string
  rawDescription: string
  coverImageUrl: string
}

const redisUrl = process.env.REDIS_URL
let redisClientPromise: Promise<RedisClientType> | undefined

const globalForSpotlight = globalThis as typeof globalThis & {
  spotlightPages?: Map<string, SpotlightPage>
}

const pages = (globalForSpotlight.spotlightPages ??= new Map<string, SpotlightPage>())

export function isRedisConfigured(): boolean {
  return Boolean(redisUrl)
}

async function getRedisClient() {
  if (!redisUrl) return undefined

  if (!redisClientPromise) {
    const client = createClient({ url: redisUrl })
    client.on('error', (error) => console.error('Redis client error:', error.message))

    redisClientPromise = client.connect().then(() => client).catch((error: unknown) => {
      redisClientPromise = undefined
      throw error
    })
  }

  return redisClientPromise
}

export async function savePage(page: SpotlightPage): Promise<void> {
  const client = await getRedisClient()
  if (client) {
    await client.set(page.slug, JSON.stringify(page))
    return
  }

  pages.set(page.slug, page)
}

export async function getPage(slug: string): Promise<SpotlightPage | undefined> {
  const client = await getRedisClient()
  if (client) {
    const page = await client.get(slug)
    return page ? JSON.parse(page) as SpotlightPage : undefined
  }

  return pages.get(slug)
}