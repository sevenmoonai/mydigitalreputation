"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

type ColorScheme = "cyan" | "red" | "green" | "purple"

const colorSchemes: Record<ColorScheme, { primary: string; secondary: string }> = {
  cyan: { primary: "#00ffff", secondary: "#0099ff" },
  red: { primary: "#ff3333", secondary: "#ff6600" },
  green: { primary: "#00ff88", secondary: "#00cc66" },
  purple: { primary: "#9933ff", secondary: "#ff33ff" },
}

export type GlitchTextProps = {
  text: string
  className?: string
  colorScheme?: ColorScheme
}

export function GlitchText({
  text,
  className,
  colorScheme = "cyan",
}: GlitchTextProps) {
  const colors = colorSchemes[colorScheme]

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (prefersReducedMotion) {
    return (
      <span className={cn("font-bold text-foreground", className)}>{text}</span>
    )
  }

  return (
    <div className={cn("relative inline-block", className)}>
      <motion.span
        className="absolute inset-0 font-bold"
        style={{ color: colors.primary, clipPath: "inset(0 0 50% 0)" }}
        animate={{
          x: [0, -3, 3, 0],
          opacity: [1, 0.8, 0.8, 1],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>

      <motion.span
        className="absolute inset-0 font-bold"
        style={{ color: colors.secondary, clipPath: "inset(50% 0 0 0)" }}
        animate={{
          x: [0, 3, -3, 0],
          opacity: [1, 0.8, 0.8, 1],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.1,
        }}
      >
        {text}
      </motion.span>

      <span className="relative font-bold text-foreground">{text}</span>
    </div>
  )
}
