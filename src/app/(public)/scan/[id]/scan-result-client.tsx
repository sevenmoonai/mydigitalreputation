"use client"

import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import type { Id } from "../../../../../convex/_generated/dataModel"
import { ScoreGauge } from "@/components/scan/score-gauge"
import { PlatformResults } from "@/components/scan/platform-results"
import { GoogleResults } from "@/components/scan/google-results"
import { ProblemsList } from "@/components/scan/problems-list"
import { ScanCTA } from "@/components/scan/scan-cta"
import { Progress } from "@/components/ui/progress"
import { DEMO_SCAN, type ScanData } from "@/lib/scan-types"
import { Skeleton } from "@/components/ui/skeleton"

export function ScanResultClient({ scanId }: { scanId: string }) {
  const scan = useQuery(api.scans.getScan, {
    scanId: scanId as Id<"scans">,
  })

  if (scan === undefined) {
    return (
      <section className="py-12">
        <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6">
          <Skeleton className="mx-auto h-8 w-64" />
          <Skeleton className="mx-auto size-48 rounded-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </section>
    )
  }

  const data: ScanData = scan
    ? {
        query: scan.query,
        score: scan.score ?? 0,
        status: scan.status,
        googleResults: (scan.googleResults ?? []) as ScanData["googleResults"],
        platformResults: (scan.platformResults ?? []) as ScanData["platformResults"],
        sentiment: scan.sentiment ?? { positive: 0, negative: 0, neutral: 0 },
        problemsDetected: (scan.problemsDetected ?? []) as ScanData["problemsDetected"],
      }
    : { ...DEMO_SCAN, query: `Scan #${scanId}` }

  const isRunning = scan?.status === "running"

  return (
    <section className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Rapport de reputation
          </h1>
          <p className="mt-2 text-muted-foreground">
            Resultats pour &laquo;&nbsp;{data.query}&nbsp;&raquo;
          </p>
        </div>

        {isRunning && (
          <div className="mx-auto mb-10 max-w-md space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Analyse en cours...
            </p>
            <Progress value={60} />
          </div>
        )}

        {!isRunning && (
          <div className="space-y-10">
            <div className="flex justify-center">
              <ScoreGauge score={data.score} />
            </div>

            <PlatformResults results={data.platformResults} />
            <GoogleResults results={data.googleResults} />
            <ProblemsList problems={data.problemsDetected} />
            <ScanCTA scanId={scanId} />
          </div>
        )}
      </div>
    </section>
  )
}
