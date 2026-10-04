if (!process.env.GEMINI_API_KEY) {
  console.error('Set GEMINI_API_KEY in .env before running npm run test:ai.')
  process.exitCode = 1
} else {
  const { generateSpotlightCopy } = await import('../lib/ai.ts')

  const result = await generateSpotlightCopy({
    productName: 'Lanterns Below',
    genre: 'cozy exploration game',
    rawDescription:
      'Explore a flooded underground town by boat, help its remaining residents, and relight old lanterns. There is no combat; the focus is on quiet exploration and small stories.',
  })

  console.log(JSON.stringify(result, null, 2))
}