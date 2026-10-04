import { GoogleGenAI, Type } from '@google/genai'

export type SpotlightInput = {
  productName: string
  genre: string
  rawDescription: string
}

export type SpotlightCopy = {
  hookLine: string
  shortPitch: string
  longDescription: string
  featureBullets: string[]
  devNote: string
  callToAction: string
}

const SYSTEM_PROMPT = `You write product copy for itch.io games. Respect itch.io's informal, personal, independent culture: sound like a thoughtful developer talking to players, not a corporate marketer. Avoid generic hype words and unsupported claims. Use only the supplied facts; do not invent features, awards, or release details. Return only a JSON object matching the requested schema, with every field populated.`

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    hookLine: { type: Type.STRING, description: 'A concise, specific opening hook.' },
    shortPitch: { type: Type.STRING, description: 'A brief pitch suitable for a game listing.' },
    longDescription: { type: Type.STRING, description: 'A fuller, readable game description.' },
    featureBullets: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    devNote: { type: Type.STRING, description: 'A personal-sounding note from the developer.' },
    callToAction: { type: Type.STRING, description: 'A friendly, low-pressure call to action.' },
  },
  required: ['hookLine', 'shortPitch', 'longDescription', 'featureBullets', 'devNote', 'callToAction'],
  propertyOrdering: ['hookLine', 'shortPitch', 'longDescription', 'featureBullets', 'devNote', 'callToAction'],
}

function isSpotlightCopy(value: unknown): value is SpotlightCopy {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return false

  const copy = value as Record<string, unknown>
  return (
    typeof copy.hookLine === 'string' &&
    typeof copy.shortPitch === 'string' &&
    typeof copy.longDescription === 'string' &&
    Array.isArray(copy.featureBullets) &&
    copy.featureBullets.every((bullet) => typeof bullet === 'string') &&
    typeof copy.devNote === 'string' &&
    typeof copy.callToAction === 'string'
  )
}

async function generateWithRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      return await fn()
    } catch (error) {
      const status =
        typeof error === 'object' && error !== null && 'status' in error
          ? error.status
          : undefined

      if (status !== 503 || attempt === attempts - 1) {
        throw error
      }

      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)))
    }
  }

  throw new Error('Gemini request failed after all retry attempts.')
}

export async function generateSpotlightCopy(input: SpotlightInput): Promise<SpotlightCopy> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is required. Add your Google AI Studio key to .env.')
  }

  const ai = new GoogleGenAI({ apiKey })
  const response = await generateWithRetry(() =>
    ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: `Game name: ${input.productName}\nGenre/category: ${input.genre || 'Not specified'}\nRaw description: ${input.rawDescription}`,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        responseSchema: RESPONSE_SCHEMA,
      },
    }),
  )

  const responseText = response.text?.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  if (!responseText) {
    throw new Error('Gemini returned an empty response.')
  }

  const parsed: unknown = JSON.parse(responseText)
  if (!isSpotlightCopy(parsed)) {
    throw new Error('Gemini response did not match the expected spotlight copy shape.')
  }

  return parsed
}