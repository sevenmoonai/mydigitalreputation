"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
        <Input
          type="text"
          placeholder="Votre nom ou pseudo..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-11"
        />
        <Button type="submit" size="lg" className="shrink-0 gap-2">
          <Search className="size-4" />
          Scanner
        </Button>
      </div>
    </form>
  )
}
