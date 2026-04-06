"use client"

import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { SpotlightCard } from "@/components/effects/spotlight-card"
import type { GoogleResult, Sentiment } from "@/lib/scan-types"

function sentimentConfig(sentiment: Sentiment) {
  switch (sentiment) {
    case "positive":
      return {
        label: "Positif",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/20",
        glow: "rgba(0, 255, 100, 0.1)",
        icon: TrendingUp,
      }
    case "negative":
      return {
        label: "Negatif",
        color: "text-red-400",
        bg: "bg-red-500/10 border-red-500/20",
        glow: "rgba(255, 50, 50, 0.1)",
        icon: TrendingDown,
      }
    default:
      return {
        label: "Neutre",
        color: "text-zinc-400",
        bg: "bg-zinc-500/10 border-zinc-500/20",
        glow: "rgba(150, 150, 150, 0.08)",
        icon: Minus,
      }
  }
}

export function GoogleResults({ results }: { results: GoogleResult[] }) {
  if (results.length === 0) return null

  return (
    <div>
      <div className="mb-5 flex items-baseline gap-3">
        <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-cyan-500/70">
          Resultats Google
        </h3>
        <span className="font-mono text-xs text-zinc-600">
          Analyse de visibilite
        </span>
        <span className="ml-auto font-mono text-xs text-zinc-600">
          {results.length} resultats
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {results.map((result) => {
          const config = sentimentConfig(result.sentiment)
          const Icon = config.icon

          return (
            <SpotlightCard
              key={result.url}
              spotlightColor={config.glow}
              className="border-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200 transition-colors hover:text-white"
                  >
                    <span className="truncate">{result.title}</span>
                    <ExternalLink className="size-3 shrink-0 text-zinc-600 transition-colors group-hover/link:text-cyan-400" />
                  </a>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">
                    {result.snippet}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-zinc-700">
                    Position #{result.position}
                  </p>
                </div>

                <span
                  className={`flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${config.bg} ${config.color}`}
                >
                  <Icon className="size-3" />
                  {config.label}
                </span>
              </div>
            </SpotlightCard>
          )
        })}
      </div>
    </div>
  )
}
