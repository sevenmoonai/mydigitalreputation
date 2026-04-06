"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export function ScanInput({
  defaultValue = "",
  onScan,
}: {
  defaultValue?: string
  onScan?: (query: string) => void
}) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    if (onScan) {
      onScan(trimmed)
    } else {
      router.push(`/scan?q=${encodeURIComponent(trimmed)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Votre nom ou pseudo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors focus:border-cyan-500/40 focus:bg-white/[0.06]"
        />
        <button
          type="submit"
          className="flex h-12 shrink-0 items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 text-sm font-semibold text-black transition-all hover:from-cyan-400 hover:to-emerald-400 active:scale-[0.98]"
        >
          <Search className="size-4" />
          Scanner
        </button>
      </div>
    </form>
  )
}
