import { generateSpotlightCopy } from '@/lib/ai'
import { savePage, type SpotlightPage } from '@/lib/db'
import { nanoid } from 'nanoid'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null)

  if (!isRecord(body)) {
    return Response.json({ error: 'Request body must be a JSON object.' }, { status: 400 })
  }

  const productName = typeof body.productName === 'string' ? body.productName.trim() : ''
  const rawDescription = typeof body.rawDescription === 'string' ? body.rawDescription.trim() : ''
  const genre = typeof body.genre === 'string' ? body.genre.trim() : ''
  const coverImageUrl = typeof body.coverImageUrl === 'string' ? body.coverImageUrl.trim() : ''

  if (!productName || !rawDescription) {
    return Response.json(
      { error: 'Product name and rough description are required.' },
      { status: 400 },
    )
  }

  try {
    const copy = await generateSpotlightCopy({ productName, genre, rawDescription })
    const gameSlug = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 48)
      .replace(/-+$/g, '') || 'game'
    const slug = `${gameSlug}-${nanoid(6)}`
    const page: SpotlightPage = {
      slug,
      productName,
      genre,
      rawDescription,
      coverImageUrl,
      ...copy,
    }

    await savePage(page)
    return Response.json({ slug })
  } catch (error) {
    console.error(
      'Spotlight generation failed:',
      error instanceof Error ? error.message : String(error),
    )
    return Response.json(
      { error: 'Spotlight generation failed. Please try again.' },
      { status: 502 },
    )
  }
}