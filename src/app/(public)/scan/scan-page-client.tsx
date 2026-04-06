"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useMutation, useAction, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"
import { ScanInput } from "@/components/scan/scan-input"
import { ScoreGauge } from "@/components/scan/score-gauge"
import { PlatformResults } from "@/components/scan/platform-results"
import { GoogleResults } from "@/components/scan/google-results"
import { ProblemsList } from "@/components/scan/problems-list"
import { ScanCTA } from "@/components/scan/scan-cta"
import { FractalGrid } from "@/components/effects/fractal-grid"
import { GlitchText } from "@/components/effects/glitch-text"
import { RadarPulse } from "@/components/effects/radar-pulse"
import { TextScramble } from "@/components/effects/text-scramble"
import { AnimatedNumber } from "@/components/effects/animated-number"
import { DEMO_SCAN, type ScanData } from "@/lib/scan-types"
import { motion, AnimatePresence } from "motion/react"
import {
  Shield,
  AlertTriangle,
  Users,
  BarChart3,
  Search,
  Loader2,
  Check,
  Clock,
} from "lucide-react"

const CONVEX_AVAILABLE = !!process.env.NEXT_PUBLIC_CONVEX_URL

type ScanStep = {
  label: string
  status: "pending" | "running" | "done"
}

const INITIAL_STEPS: ScanStep[] = [
  { label: "Analyse Google...", status: "pending" },
  { label: "Scan reseaux sociaux...", status: "pending" },
  { label: "Verification des forums...", status: "pending" },
  { label: "Detection de menaces...", status: "pending" },
  { label: "Analyse de sentiment...", status: "pending" },
  { label: "Calcul du score...", status: "pending" },
]

function getScoreGlowColor(score: number): string {
  if (score >= 80) return "rgba(0, 255, 100, 0.5)"
  if (score >= 60) return "rgba(255, 200, 0, 0.5)"
  if (score >= 40) return "rgba(255, 140, 0, 0.5)"
  return "rgba(255, 50, 50, 0.5)"
}

export function ScanPageClient({ initialQuery }: { initialQuery: string }) {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [demoData, setDemoData] = useState<ScanData | null>(null)
  const [scanId, setScanId] = useState<Id<"scans"> | null>(null)
  const [steps, setSteps] = useState<ScanStep[]>(INITIAL_STEPS)
  const [currentQuery, setCurrentQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const startScan = useMutation(api.scans.startScan)
  const triggerScan = useAction(api.scanEngine.triggerScan)
  const scan = useQuery(api.scans.getScan, scanId ? { scanId } : "skip")

  const advanceSteps = useCallback((progressValue: number) => {
    const stepThresholds = [15, 30, 50, 65, 80, 95]
    setSteps((prev) =>
      prev.map((step, i) => {
        if (progressValue >= stepThresholds[i]) {
          return { ...step, status: "done" }
        }
        if (i === 0 || progressValue >= stepThresholds[i - 1]) {
          return prev[i].status === "done"
            ? prev[i]
            : { ...step, status: "running" }
        }
        return { ...step, status: "pending" }
      })
    )
  }, [])

  const runDemoScan = useCallback(
    (query: string) => {
      setScanning(true)
      setProgress(0)
      setDemoData(null)
      setScanId(null)
      setCurrentQuery(query)
      setShowResults(false)
      setSteps(INITIAL_STEPS.map((s) => ({ ...s, status: "pending" })))

      const values = [10, 20, 35, 50, 65, 80, 90, 100]
      let step = 0

      const interval = setInterval(() => {
        if (step < values.length) {
          const v = values[step]
          setProgress(v)
          advanceSteps(v)
          step++
        } else {
          clearInterval(interval)
          setSteps((prev) => prev.map((s) => ({ ...s, status: "done" })))
          setTimeout(() => {
            setScanning(false)
            setDemoData({ ...DEMO_SCAN, query })
            setShowResults(true)
          }, 600)
        }
      }, 500)
    },
    [advanceSteps]
  )

  const runConvexScan = useCallback(
    async (query: string) => {
      setScanning(true)
      setProgress(10)
      setDemoData(null)
      setScanId(null)
      setCurrentQuery(query)
      setShowResults(false)
      setSteps(INITIAL_STEPS.map((s) => ({ ...s, status: "pending" })))

      try {
        const id = await startScan({ query })
        setScanId(id)
        setProgress(30)
        advanceSteps(30)

        try {
          await triggerScan({ scanId: id, query })
        } catch {
          // scan engine may not be configured
        }
        setProgress(50)
        advanceSteps(50)
      } catch {
        runDemoScan(query)
      }
    },
    [startScan, triggerScan, runDemoScan, advanceSteps]
  )

  useEffect(() => {
    if (scan && scan.status === "completed") {
      setScanning(false)
      setProgress(100)
      setSteps((prev) => prev.map((s) => ({ ...s, status: "done" })))
      setShowResults(true)
    } else if (scan && scan.status === "failed") {
      setScanning(false)
    } else if (scan && scan.status === "running") {
      setProgress((prev) => {
        const next = Math.min(prev + 5, 90)
        advanceSteps(next)
        return next
      })
    }
  }, [scan, advanceSteps])

  const handleScan = useCallback(
    (query: string) => {
      if (CONVEX_AVAILABLE) {
        runConvexScan(query)
      } else {
        runDemoScan(query)
      }
    },
    [runConvexScan, runDemoScan]
  )

  useEffect(() => {
    if (initialQuery) {
      handleScan(initialQuery)
    }
  }, [initialQuery, handleScan])

  const displayData: ScanData | null = useMemo(() => {
    if (scan && scan.status === "completed") {
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
    return demoData
  }, [scan, demoData])

  const threatsCount = displayData?.problemsDetected.length ?? 0
  const profilesFound =
    displayData?.platformResults.filter((r) => r.found).length ?? 0
  const sentimentScore = displayData
    ? Math.round(
        (displayData.sentiment.positive /
          Math.max(
            1,
            displayData.sentiment.positive +
              displayData.sentiment.negative +
              displayData.sentiment.neutral
          )) *
          100
      )
    : 0

  return (
    <div className="relative min-h-screen bg-[#030303] text-white overflow-hidden">
      <FractalGrid color="rgba(0, 255, 200, 0.15)" cellSize={28} />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030303]/90 pointer-events-none" />

      <div className="relative z-10">
        {/* Input Section */}
        <AnimatePresence mode="wait">
          {!scanning && !displayData && (
            <motion.section
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-screen flex-col items-center justify-center px-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-2"
              >
                <Shield className="mx-auto size-16 text-cyan-400/60" />
              </motion.div>

              <h1 className="mb-3 text-center text-4xl font-bold tracking-tight sm:text-5xl">
                <TextScramble duration={1.2}>Centre d&apos;Operations</TextScramble>
              </h1>
              <p className="mb-8 max-w-md text-center text-sm text-zinc-400">
                Entrez un nom pour lancer une analyse complete de reputation
                numerique. 400+ plateformes scannees.
              </p>
              <ScanInput defaultValue={initialQuery} onScan={handleScan} />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Scanning State */}
        <AnimatePresence>
          {scanning && (
            <motion.section
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-screen flex-col items-center justify-center px-4"
            >
              <div className="relative mb-10">
                <RadarPulse className="size-48 opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold tabular-nums text-cyan-300">
                    {progress}%
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <GlitchText
                  text={currentQuery}
                  colorScheme="cyan"
                  className="text-3xl sm:text-4xl"
                />
              </div>

              <div className="w-full max-w-sm space-y-3">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.3 }}
                    className="flex items-center gap-3 font-mono text-sm"
                  >
                    {step.status === "done" && (
                      <Check className="size-4 shrink-0 text-emerald-400" />
                    )}
                    {step.status === "running" && (
                      <Loader2 className="size-4 shrink-0 animate-spin text-cyan-400" />
                    )}
                    {step.status === "pending" && (
                      <Clock className="size-4 shrink-0 text-zinc-600" />
                    )}
                    <span
                      className={
                        step.status === "done"
                          ? "text-emerald-400/80"
                          : step.status === "running"
                            ? "text-cyan-300"
                            : "text-zinc-600"
                      }
                    >
                      {step.label}
                    </span>
                    {step.status === "done" && (
                      <span className="ml-auto text-xs text-emerald-500/60">
                        OK
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {showResults && displayData && (
            <motion.section
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-5xl px-4 py-16 sm:px-6"
            >
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
                  {displayData.query}
                </h1>
              </motion.div>

              {/* Score Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mx-auto mb-12 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm"
                style={{
                  boxShadow: `0 0 80px -20px ${getScoreGlowColor(displayData.score)}`,
                }}
              >
                <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between">
                  <ScoreGauge score={displayData.score} />

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

              {/* Google Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <GoogleResults results={displayData.googleResults} />
              </motion.div>

              {/* Platform Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-12"
              >
                <PlatformResults results={displayData.platformResults} />
              </motion.div>

              {/* Problems */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-12"
              >
                <ProblemsList problems={displayData.problemsDetected} />
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <ScanCTA scanId={scanId ?? undefined} />
              </motion.div>

              {/* New Scan */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-12 flex justify-center"
              >
                <button
                  onClick={() => {
                    setDemoData(null)
                    setShowResults(false)
                    setScanId(null)
                    setCurrentQuery("")
                    setProgress(0)
                  }}
                  className="group flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-cyan-400"
                >
                  <Search className="size-4" />
                  Lancer un nouveau scan
                </button>
              </motion.div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
