"use client"

import { useCallback, useEffect, useState } from "react"
import { useMutation, useAction, useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"
import { ScanInput } from "@/components/scan/scan-input"
import { ScoreGauge } from "@/components/scan/score-gauge"
import { PlatformResults } from "@/components/scan/platform-results"
import { GoogleResults } from "@/components/scan/google-results"
import { ProblemsList } from "@/components/scan/problems-list"
import { ScanCTA } from "@/components/scan/scan-cta"
import { Progress } from "@/components/ui/progress"
import { DEMO_SCAN, type ScanData } from "@/lib/scan-types"

const CONVEX_AVAILABLE = !!process.env.NEXT_PUBLIC_CONVEX_URL

export function ScanPageClient({ initialQuery }: { initialQuery: string }) {
  const [scanning, setScanning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [demoData, setDemoData] = useState<ScanData | null>(null)
  const [scanId, setScanId] = useState<Id<"scans"> | null>(null)

  const startScan = useMutation(api.scans.startScan)
  const triggerScan = useAction(api.scanEngine.triggerScan)
  const scan = useQuery(
    api.scans.getScan,
    scanId ? { scanId } : "skip"
  )

  const runDemoScan = useCallback((query: string) => {
    setScanning(true)
    setProgress(0)
    setDemoData(null)
    setScanId(null)

    const steps = [10, 25, 40, 55, 70, 85, 100]
    let step = 0

    const interval = setInterval(() => {
      if (step < steps.length) {
        setProgress(steps[step])
        step++
      } else {
        clearInterval(interval)
        setScanning(false)
        setDemoData({ ...DEMO_SCAN, query })
      }
    }, 400)
  }, [])

  const runConvexScan = useCallback(async (query: string) => {
    setScanning(true)
    setProgress(10)
    setDemoData(null)
    setScanId(null)

    try {
      const id = await startScan({ query })
      setScanId(id)
      setProgress(30)

      try {
        await triggerScan({ scanId: id, query })
      } catch {
        // Le service de scan externe n'est peut-etre pas configure
        // Le scan reste en "running" et sera mis a jour via webhook
      }
      setProgress(50)
    } catch {
      // Fallback vers le scan demo si Convex echoue
      runDemoScan(query)
    }
  }, [startScan, triggerScan, runDemoScan])

  useEffect(() => {
    if (scan && scan.status === "completed") {
      setScanning(false)
      setProgress(100)
    } else if (scan && scan.status === "failed") {
      setScanning(false)
    } else if (scan && scan.status === "running") {
      setProgress((prev) => Math.min(prev + 5, 90))
    }
  }, [scan])

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

  const displayData: ScanData | null = scan && scan.status === "completed"
    ? {
        query: scan.query,
        score: scan.score ?? 0,
        status: scan.status,
        googleResults: (scan.googleResults ?? []) as ScanData["googleResults"],
        platformResults: (scan.platformResults ?? []) as ScanData["platformResults"],
        sentiment: scan.sentiment ?? { positive: 0, negative: 0, neutral: 0 },
        problemsDetected: (scan.problemsDetected ?? []) as ScanData["problemsDetected"],
      }
    : demoData

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Scannez votre reputation en ligne
          </h1>
          <p className="text-muted-foreground">
            Entrez votre nom ou pseudo pour decouvrir ce qu&apos;Internet dit de
            vous.
          </p>
          <ScanInput defaultValue={initialQuery} onScan={handleScan} />
        </div>

        {scanning && (
          <div className="mx-auto mb-10 max-w-md space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Analyse en cours... {progress}%
            </p>
            <Progress value={progress} />
          </div>
        )}

        {displayData && (
          <div className="space-y-10">
            <div className="flex justify-center">
              <ScoreGauge score={displayData.score} />
            </div>

            <PlatformResults results={displayData.platformResults} />
            <GoogleResults results={displayData.googleResults} />
            <ProblemsList problems={displayData.problemsDetected} />
            <ScanCTA scanId={scanId ?? undefined} />
          </div>
        )}
      </div>
    </section>
  )
}
