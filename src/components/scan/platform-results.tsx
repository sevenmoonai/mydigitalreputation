"use client"

import { Check, X } from "lucide-react"
import { MouseEffectCard } from "@/components/effects/mouse-effect-card"
import type { PlatformResult } from "@/lib/scan-types"

const PLATFORM_ICONS: Record<string, string> = {
  LinkedIn: "in",
  "Twitter/X": "X",
  Facebook: "f",
  Instagram: "ig",
  GitHub: "<>",
  YouTube: "YT",
  TikTok: "TT",
  Reddit: "r/",
  Medium: "M",
  Pinterest: "P",
  Viadeo: "V",
  Malt: "M",
}

export function PlatformResults({
  results,
}: {
  results: PlatformResult[]
}) {
  const foundCount = results.filter((r) => r.found).length

  return (
    <div>
      <div className="mb-5 flex items-baseline gap-3">
        <h3 className="font-mono text-xs font-medium uppercase tracking-widest text-cyan-500/70">
          Presence sur les plateformes
        </h3>
        <span className="ml-auto font-mono text-xs text-zinc-600">
          {foundCount}/{results.length} detectes
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {results.map((result) => (
          <MouseEffectCard
            key={result.platform}
            glowColor={result.found ? "0, 255, 150" : "100, 100, 100"}
            className={
              result.found
                ? "border-emerald-500/20"
                : "border-white/[0.04] opacity-50"
            }
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                  result.found
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-zinc-800 text-zinc-600"
                }`}
              >
                {PLATFORM_ICONS[result.platform] ?? result.platform[0]}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm font-medium ${
                    result.found ? "text-zinc-200" : "text-zinc-600"
                  }`}
                >
                  {result.platform}
                </p>
                {result.found && result.username && (
                  <p className="truncate font-mono text-[10px] text-emerald-500/60">
                    @{result.username}
                  </p>
                )}
              </div>

              <div className="shrink-0">
                {result.found ? (
                  <div className="flex size-5 items-center justify-center rounded-full bg-emerald-500/20">
                    <Check className="size-3 text-emerald-400" />
                  </div>
                ) : (
                  <div className="flex size-5 items-center justify-center rounded-full bg-zinc-800">
                    <X className="size-3 text-zinc-600" />
                  </div>
                )}
              </div>
            </div>
          </MouseEffectCard>
        ))}
      </div>
    </div>
  )
}
