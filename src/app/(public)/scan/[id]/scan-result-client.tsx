"use client"

import { useMemo } from "react"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { ScoreGauge } from "@/components/scan/score-gauge"
import { PlatformResults } from "@/components/scan/platform-results"
import { GoogleResults } from "@/components/scan/google-results"
import { ProblemsList } from "@/components/scan/problems-list"
import { ScanCTA } from "@/components/scan/scan-cta"
import { FractalGrid } from "@/components/effects/fractal-grid"
import { RadarPulse } from "@/components/effects/radar-pulse"
import { AnimatedNumber } from "@/components/effects/animated-number"
import { DEMO_SCAN, type ScanData } from "@/lib/scan-types"
import { motion } from "motion/react"
import {
  AlertTriangle,
  Users,
  BarChart3,
  Loader2,
} from "lucide-react"

function getScoreGlowColor(score: number): string {
  if (score >= 80) return "rgba(0, 255, 100, 0.5)"
  if (score >= 60) return "rgba(255, 200, 0, 0.5)"
  if (score >= 40) return "rgba(255, 140, 0, 0.5)"
  return "rgba(255, 50, 50, 0.5)"
}

export function ScanResultClient({ scanId }: { scanId: string }) {
  const scan = useQuery(api.scans.getScan, {
    scanId: scanId as Id<"scans">,
  })

  const data: ScanData = useMemo(() => {
    if (scan) {
      return {
        query: scan.query,
        score: scan.score ?? 0,
        status: scan.status,
        googleResults: (scan.googleResults ?? []) as ScanData["googleResults"],
        platformResults: (scan.platformResults ??
          []) as ScanData["platformResults"],
        sentiment: scan.sentiment ?? {
          positive: 0,
          negative: 0,
          neutral: 0,
        },
        problemsDetected: (scan.problemsDetected ??
          []) as ScanData["problemsDetected"],
      }
    }
    return { ...DEMO_SCAN, query: `Scan #${scanId}` }
  }, [scan, scanId])

  const isRunning = scan?.status === "running"
  const isLoading = scan === undefined

  const threatsCount = data.problemsDetected.length
  const profilesFound = data.platformResults.filter((r) => r.found).length
  const sentimentScore = Math.round(
    (data.sentiment.positive /
      Math.max(
        1,
        data.sentiment.positive +
          data.sentiment.negative +
          data.sentiment.neutral
      )) *
      100
  )

  return (
    <div className="relative min-h-screen bg-[#030303] text-white overflow-hidden">
      <FractalGrid color="rgba(0, 255, 200, 0.15)" cellSize={28} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]/90 pointer-events-none" />

      <div className="relative z-10">
        {/* Loading skeleton */}
        {isLoading && (
          <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <Loader2 className="size-8 animate-spin text-cyan-500/60" />
            <p className="font-mono text-sm text-zinc-600">
              Chargement du rapport...
            </p>
          </div>
        )}

        {/* Still running */}
        {!isLoading && isRunning && (
          <div className="flex min-h-screen flex-col items-center justify-center px-4">
            <RadarPulse className="mb-8 size-48 opacity-60" />
            <h1 className="mb-2 text-2xl font-bold">{data.query}</h1>
            <p className="font-mono text-sm text-cyan-500/70">
              Analyse en cours...
            </p>
          </div>
        )}

        {/* Completed results */}
        {!isLoading && !isRunning && (
          <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-4 text-center"
            >
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-cyan-500/70">
                Rapport de mission
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {data.query}
              </h1>
            </motion.div>

            {/* Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mx-auto mb-12 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
              style={{
                boxShadow: `0 0 80px -20px ${getScoreGlowColor(data.score)}`,
              }}
            >
              <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
                <ScoreGauge score={data.score} />

                <div className="grid grid-cols-3 gap-6 text-center sm:gap-10">
                  <div>
                    <div className="mb-1 flex items-center justify-center gap-1.5 text-red-400">
                      <AlertTriangle className="size-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Menaces
                      </span>
                    </div>
                    <AnimatedNumber
                      value={threatsCount}
                      className="text-2xl font-bold text-red-300"
                      springOptions={{ bounce: 0, duration: 1500 }}
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-center gap-1.5 text-cyan-400">
                      <Users className="size-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Profils
                      </span>
                    </div>
                    <AnimatedNumber
                      value={profilesFound}
                      className="text-2xl font-bold text-cyan-300"
                      springOptions={{ bounce: 0, duration: 1500 }}
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-center gap-1.5 text-emerald-400">
                      <BarChart3 className="size-4" />
                      <span className="text-xs font-medium uppercase tracking-wider">
                        Sentiment
                      </span>
                    </div>
                    <div className="flex items-baseline justify-center gap-0.5">
                      <AnimatedNumber
                        value={sentimentScore}
                        className="text-2xl font-bold text-emerald-300"
                        springOptions={{ bounce: 0, duration: 1500 }}
                      />
                      <span className="text-sm text-emerald-500/60">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <GoogleResults results={data.googleResults} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <PlatformResults results={data.platformResults} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-12"
            >
              <ProblemsList problems={data.problemsDetected} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <ScanCTA scanId={scanId} />
            </motion.div>
          </section>
        )}
      </div>
    </div>
  )
}
