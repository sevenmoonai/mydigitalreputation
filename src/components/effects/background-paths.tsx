"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

export type BackgroundPathsProps = {
  className?: string
  pathCount?: number
  animated?: boolean
}

export function BackgroundPaths({
  className,
  pathCount = 7,
  animated = true,
}: BackgroundPathsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden -z-10", className)}>
      <svg
        className="size-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="pathGradientCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="pathGradientGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {Array.from({ length: pathCount }).map((_, i) => {
          const offset = i * 150
          const startY = 100 + i * 120
          const gradient = i % 2 === 0 ? "url(#pathGradientCyan)" : "url(#pathGradientGreen)"

          return (
            <motion.path
              key={i}
              d={`M ${-100 + offset} ${startY} Q ${250 + offset} ${startY - 150}, ${500 + offset} ${startY} T ${1100 + offset} ${startY}`}
              fill="none"
              stroke={gradient}
              strokeWidth={1.5}
              initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
              animate={
                animated
                  ? {
                      pathLength: 1,
                      opacity: [0, 0.6, 0.3],
                    }
                  : undefined
              }
              transition={{
                duration: 3,
                delay: i * 0.4,
                ease: "easeInOut",
                opacity: {
                  duration: 4,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
