import { notFound } from 'next/navigation'
import { getPage } from '@/lib/db'
import { CopyButton } from './copy-button'

function CopyBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="border-t border-slate-800 py-6">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">{title}</h2>
        <CopyButton text={text} />
      </div>
      <p className="whitespace-pre-wrap text-base leading-7 text-slate-100">{text}</p>
    </section>
  )
}

export default async function SpotlightPreview({
  params,
}: PageProps<'/p/[slug]'>) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-100">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
            Itch.io spotlight
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {page.productName}
          </h1>
          {page.genre && <p className="mt-2 text-slate-400">{page.genre}</p>}
          <CopyBlock title="Hook line" text={page.hookLine} />
        </header>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 sm:px-8">
          <CopyBlock title="Short pitch" text={page.shortPitch} />
          <CopyBlock title="Full description" text={page.longDescription} />
          <section className="border-t border-slate-800 py-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Features</h2>
              <CopyButton text={page.featureBullets.map((bullet) => `- ${bullet}`).join('\n')} />
            </div>
            <ul className="list-inside list-disc space-y-2 text-base leading-7 text-slate-100">
              {page.featureBullets.map((bullet, index) => <li key={`${index}-${bullet}`}>{bullet}</li>)}
            </ul>
          </section>
          <CopyBlock title="Developer note" text={page.devNote} />
          <CopyBlock title="Call to action" text={page.callToAction} />
        </div>

        <aside className="mt-8 border-l-2 border-violet-500 pl-4 text-sm leading-6 text-slate-400">
          These sections are meant to be pasted into itch.io&apos;s own game edit page. This preview is a drafting aid; it does not publish or host your page on itch.io.
        </aside>
      </article>
    </main>
  )
}