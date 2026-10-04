import type { SpotlightCopy } from '@/lib/ai'

export type SpotlightPage = SpotlightCopy & {
  slug: string
  productName: string
  genre: string
  rawDescription: string
  coverImageUrl: string
}

const globalForSpotlight = globalThis as typeof globalThis & {
  spotlightPages?: Map<string, SpotlightPage>
}

const pages = (globalForSpotlight.spotlightPages ??= new Map<string, SpotlightPage>())

export function savePage(page: SpotlightPage): void {
  pages.set(page.slug, page)
}

export function getPage(slug: string): SpotlightPage | undefined {
  return pages.get(slug)
}