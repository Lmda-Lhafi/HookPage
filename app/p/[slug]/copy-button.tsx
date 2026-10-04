'use client'

import { useState } from 'react'

export function CopyButton({ text }: { text: string }) {
  const [status, setStatus] = useState('Copy')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('Copied')
    } catch {
      setStatus('Copy failed')
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
    >
      {status}
    </button>
  )
}