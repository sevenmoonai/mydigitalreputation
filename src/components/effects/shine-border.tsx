"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface ShineBorderProps {
  children: React.ReactNode
  className?: string
  borderWidth?: number
  duration?: number
  color?: string | string[]
  borderRadius?: number
}

export function ShineBorder({
  children,
  className,
  borderWidth = 1,
  duration = 14,
  color = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
  borderRadius = 8,
}: ShineBorderProps) {
  const colors = Array.isArray(color) ? color.join(", ") : color

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg p-[1px]",
        className
      )}
      style={{
        borderRadius,
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${colors})`,
          backgroundSize: "200% 200%",
          borderRadius,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div
        className="relative bg-zinc-950"
        style={{
          borderRadius: borderRadius - borderWidth,
        }}
      >
        {children}
      </div>
    </div>
  )
}
