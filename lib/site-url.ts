const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL

export const siteUrl = process.env.SITE_URL
  ? new URL(process.env.SITE_URL)
  : productionHost
    ? new URL(`https://${productionHost}`)
    : new URL('http://localhost:3000')