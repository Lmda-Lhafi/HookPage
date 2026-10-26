'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Page() {
  const router = useRouter()
  const [gameName, setGameName] = useState('')
  const [genre, setGenre] = useState('')
  const [description, setDescription] = useState('')
  const [coverImageUrl, setCoverImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: gameName,
          genre,
          rawDescription: description,
          coverImageUrl,
        }),
      })
      const result: unknown = await response.json().catch(() => null)

      if (!response.ok) {
        const message =
          typeof result === 'object' && result !== null && 'error' in result && typeof result.error === 'string'
            ? result.error
            : 'Could not generate spotlight copy. Please try again.'
        throw new Error(message)
      }

      if (typeof result !== 'object' || result === null || !('slug' in result) || typeof result.slug !== 'string') {
        throw new Error('The server returned an invalid preview link. Please try again.')
      }

      router.push(`/p/${encodeURIComponent(result.slug)}`)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Could not generate spotlight copy. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <Image
              src="/product-spotlight-logo.svg"
              alt=""
              width={48}
              height={48}
              priority
            />
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
              HookPage
            </p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Itch.io game description generator
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">
            Turn rough game notes into a hook, pitch, full description, feature list, and call to action ready to paste into your itch.io page.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-slate-950/40"
        >
          <div className="space-y-2">
            <label htmlFor="gameName" className="block text-sm font-medium text-slate-200">
              Game name
            </label>
            <input
              id="gameName"
              type="text"
              value={gameName}
              onChange={(event) => setGameName(event.target.value)}
              placeholder="e.g. Hollow Knight"
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="genre" className="block text-sm font-medium text-slate-200">
              Genre / category
            </label>
            <input
              id="genre"
              type="text"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              placeholder="e.g. Metroidvania, Action RPG"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-200">
              Rough description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              placeholder="Describe what makes the game stand out..."
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="coverImageUrl" className="block text-sm font-medium text-slate-200">
              Cover image URL
            </label>
            <input
              id="coverImageUrl"
              type="url"
              value={coverImageUrl}
              onChange={(event) => setCoverImageUrl(event.target.value)}
              placeholder="https://example.com/cover.jpg"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-50 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/40 disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? 'Generating...' : 'Generate spotlight copy'}
            </button>
          </div>
        </form>

        {error && (
          <p role="alert" className="mt-5 rounded-xl border border-red-900 bg-red-950/60 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        )}

      </div>
    </main>
  )
}
