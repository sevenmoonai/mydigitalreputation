"use client"

import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { AnimatedNumber } from "@/components/effects/animated-number"

function getScoreColor(score: number): string {
  if (score >= 80) return "#00ff88"
  if (score >= 60) return "#ffc800"
  if (score >= 40) return "#ff8c00"
  return "#ff3333"
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent"
  if (score >= 60) return "Correct"
  if (score >= 40) return "Problemes visibles"
  return "Critique"
}

export function ScoreGauge({ score }: { score: number }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 200)
    return () => clearTimeout(t)
  }, [])

  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = getScoreColor(score)

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative size-48">
        {/* Glow behind the gauge */}
        <div
          className="absolute inset-4 rounded-full blur-2xl opacity-30"
          style={{ backgroundColor: color }}
        />

        <svg className="relative size-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: show ? offset : circumference,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedNumber
            value={show ? score : 0}
            className="text-4xl font-bold tabular-nums"
            springOptions={{ bounce: 0, duration: 2000 }}
          />
          <span className="text-xs text-zinc-500">/100</span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-sm font-medium"
        style={{ color }}
      >
        {getScoreLabel(score)}
      </motion.p>
    </div>
  )
}
