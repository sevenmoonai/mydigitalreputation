"use client"

import { useEffect, useState } from "react"

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-500"
  if (score >= 60) return "text-yellow-500"
  if (score >= 40) return "text-orange-500"
  return "text-red-500"
}

function getStrokeColor(score: number): string {
  if (score >= 80) return "stroke-green-500"
  if (score >= 60) return "stroke-yellow-500"
  if (score >= 40) return "stroke-orange-500"
  return "stroke-red-500"
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Correct"
  if (score >= 40) return "Problemes visibles"
  return "Critique"
}

export function ScoreGauge({ score }: { score: number }) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedScore(score), 100)
    return () => clearTimeout(timeout)
  }, [score])

  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (animatedScore / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative size-48">
        <svg className="size-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            className="stroke-muted"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            className={getStrokeColor(score)}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-4xl font-bold tabular-nums ${getScoreColor(score)}`}
          >
            {animatedScore}
          </span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <p className={`text-sm font-medium ${getScoreColor(score)}`}>
        {getScoreLabel(score)}
      </p>
    </div>
  )
}
